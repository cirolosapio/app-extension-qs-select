<template>
  <q-select v-bind="selectProps" v-on="selectEvents">

    <template v-if="value && ((multiple && value.length > 0) || opts.findIndex(opt => opt.value === value) !== -1)" #selected>
      <template v-if="multiple">
        <span class="ellipsis" style="max-width: 190px" v-if="(value.length === 1 || noDenseCounter)">
          {{ displayValueMultiple }}
        </span>
        <template v-else>
          {{ $q.lang.table.selectedRecords(value.length) }}
          <q-tooltip max-width="40vw" :content-class="{ 'text-caption': value.length < 5 }">
            {{ displayValueMultiple }}
          </q-tooltip>
        </template>
      </template>
      <template v-else>
        {{ getLabel(value) }}
      </template>
    </template>

    <template #append>
      <slot name="append" />
      <transition-group appear :name="transition" v-if="multiple && opened">
        <q-icon name="mdi-check-box-multiple-outline" class="cursor-pointer" v-if="!noSelectAll && opts.length !== (value || []).length" key="select-all" @click.prevent.stop="selectAll" />
        <q-icon name="mdi-swap-vertical" class="cursor-pointer" v-if="!noReverse" key="invert-selection" @click.prevent.stop="invertSelection" />
      </transition-group>
    </template>

    <template #option="{ itemProps, itemEvents, opt, focused }">
      <q-item v-bind="itemProps" v-on="{ ...itemEvents, ...hoverEvents }">
        <q-item-section>
          <q-item-label v-html="highlight(opt.label)" />
        </q-item-section>
        <q-item-section side v-if="!noOnly && multiple && focused && hovering">
          <q-btn size="14px" padding="none sm" flat :text-color="`${$attrs.color}`" :label="$q.lang.label.select" no-caps @click.prevent.stop="only(opt.value)" />
        </q-item-section>
      </q-item>
    </template>

    <template #no-option="inputValue">
      <slot name="no-option" v-bind="inputValue">
        <q-item dense>
          <q-item-section class="text-grey">
            {{ needle ? $q.lang.table.noResults : $q.lang.table.noData }}
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <slot name="default" v-if="$slots.default" />
    <template v-if="$slots.before" #before>
      <slot name="before" />
    </template>
    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
    <template v-if="$slots['before-options']" #before-options>
      <slot name="before-options" />
    </template>
    <template v-if="$slots['after-options']" #after-options>
      <slot name="after-options" />
    </template>

  </q-select>
</template>

<script>
import TransitionMixin from 'quasar/src/mixins/transition.js'
export default {
  name: 'QsSelect',
  mixins: [TransitionMixin],
  inheritAttrs: false,
  props: {
    value: {
      // type: [Number, String, Array],
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    highlightClass: {
      type: String,
      default: () => 'text-teal'
    },
    transitionShow: {
      type: String,
      default: () => 'jump-left'
    },
    transitionHide: {
      type: String,
      default: () => 'jump-right'
    },
    url: {
      type: Object,
      validator: ({ route }) => Boolean(route)
    },
    minLength: {
      type: [String, Number],
      validator: length => length > 1
    },
    freeze: Boolean,
    multiple: Boolean,
    noClear: Boolean,
    noClientSearch: Boolean,
    noDenseCounter: Boolean,
    noOnly: Boolean,
    noReverse: Boolean,
    noSelectAll: Boolean,
    optionDisable: String,
    optionLabel: String,
    optionValue: String
  },

  data () {
    return {
      loading: false,
      opened: false,
      hovering: false,
      opts: [],
      needle: ''
    }
  },

  async created () {
    if (this.value) {
      await this.checkDisplayValue()
      // this.haveToEmit && this.emitItem(this.value)
    }
  },

  computed: {
    selectProps () {
      const attrKeys = Object.keys(this.$attrs)
      return {
        ...this.$attrs,
        ref: 'select',
        clearable: !this.noClear,
        useInput: !attrKeys.includes('readonly') && !attrKeys.includes('disable'),
        emitValue: true,
        mapOptions: !this.freeze,
        optionsDense: true,
        optionsSanitize: true,
        value: this.value,
        options: this.opts,
        loading: this.loading,
        multiple: this.multiple,
        inputDebounce: 300
      }
    },
    selectEvents () {
      return {
        input: this.ok,
        filter: this.search,
        'input-value': filter => { this.needle = filter },
        'popup-show': () => { this.opened = true },
        'popup-hide': () => { this.opened = false }
      }
    },
    displayValueMultiple () {
      if (!this.multiple || !this.value || this.value.length === 0) return null
      return this.opts
        .filter(({ value }) => this.value.includes(value))
        .map(({ label }) => label)
        .join(', ')
    },
    getLabel () {
      return opt => this.opts
        .find(({ value }) => value === opt)
        .label
    },

    isLazy () { return Boolean(this.url && this.url.route) },
    highlight () {
      return label => {
        const regex = new RegExp(`(${this.needle})`, 'ig')
        const replace = `<span class="${this.highlightClass}">$1</span>`
        return label.replace(regex, replace)
      }
    },
    haveToEmit () {
      return !this.multiple &&
        Object.keys(this.$listeners).includes('item') &&
        (this.isLazy || typeof this.options[0] !== 'string')
    },
    hoverEvents () {
      if (this.noOnly) return {}
      return {
        mouseenter: () => { this.hovering = true },
        mouseleave: () => { this.hovering = false }
      }
    }
  },

  watch: {
    options () { this.resetOptions() }
  },

  methods: {
    showPopup () { this.$refs.select.showPopup() },
    hidePopup () { this.$refs.select.hidePopup() },
    async checkDisplayValue () {
      if (this.isLazy) this.setOptions(await this.fetchOptions('/' + this.value))
      else this.resetOptions()
    },
    setOptions (options, parse = true) {
      this.freeze && Object.freeze(options)
      this.opts = parse ? this.parseOptions(options) : options
    },
    resetOptions () { this.setOptions(this.options) },
    async prepareOptions () {
      if (this.options.length > 0) this.resetOptions()
      else if (this.isLazy) this.setOptions(await this.fetchOptions())
    },
    async fetchOptions (path = '') {
      this.loading = true
      const url = this.url.route + path
      const params = {
        [this.url.filterParam || 'filter']: this.needle,
        ...this.url.filters
      }
      let data
      if (process.env._QsSelect.api_type === 'fetch') data = await (await fetch(url + '?' + params)).json()
      else data = (await this[process.env._QsSelect.axios_key].get(url, { params })).data
      this.loading = false
      return Array.isArray(data) ? data : [data]
    },
    parseOptions (options) {
      return typeof options[0] === 'string'
        ? options.map(item => ({ label: item, value: item }))
        : options.map(({ value, label, disable, ...item }) => ({
          value: value || item[this.optionValue],
          label: label || item[this.optionLabel],
          disable: disable || item[this.optionDisable],
          item: this.haveToEmit ? item : undefined
        }))
    },
    invertSelection () {
      const values = this.opts
        .map(({ value }) => value)
        .filter(val => !this.value.includes(val))
      this.$emit('input', values)
    },
    selectAll () {
      const values = this.opts.map(({ value }) => value)
      this.$emit('input', values)
    },
    only (value) { this.multiple && this.$emit('input', [value]) },
    ok (newVal) {
      this.$emit('input', newVal)
      this.haveToEmit && newVal && this.emitItem(newVal)
    },
    emitItem (newVal) {
      const { item } = this.opts.find(({ value }) => value === newVal)
      if (item) this.$emit('item', item)
    },
    searchFn (filter) {
      return ({ label }) => label
        .toLowerCase()
        .indexOf(filter.toLowerCase()) > -1
    },
    async search (filter, doneFn, abortFn) {
      if (this.isLazy && this.minLength && filter.length < this.minLength) abortFn()
      else {
        await this.prepareOptions()

        doneFn(() => {
          const results = this.noClientSearch
            ? this.opts
            : this.opts.filter(this.searchFn(filter))
          this.setOptions(results, false)
        })
      }
    }
  }
}
</script>
