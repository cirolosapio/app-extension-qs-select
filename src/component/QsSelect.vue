<template>
  <q-select v-bind="selectProps" v-on="selectEvents">

    <template v-if="!noDenseCounter && multiple && value && value.length > 0" #selected>
      <span class="ellipsis" style="max-width: 190px" v-if="value.length === 1">{{ displayValue }}</span>
      <template v-else>{{ $q.lang.table.selectedRecords(value.length) }}</template>
      <q-tooltip max-width="40vw" :content-class="{ 'text-caption': value.length < 5 }" v-if="value.length > 1">{{ displayValue }}</q-tooltip>
    </template>

    <template #append>
      <slot name="append" />
      <transition-group appear :name="transition" v-if="multiple && focused">
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

    <slot name="default" />
    <template #before>
      <slot name="before" />
    </template>
    <template #after>
      <slot name="after" />
    </template>
    <template #error>
      <slot name="error" />
    </template>
    <template #hint>
      <slot name="hint" />
    </template>
    <template #loading>
      <slot name="loading" />
    </template>
    <template #prepend>
      <slot name="prepend" />
    </template>
  </q-select>
</template>

<script>
import TransitionMixin from '../mixins/transition'
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
    highlightColor: {
      type: String,
      default: () => 'teal'
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
      validator ({ route }) {
        return !!route
      }
    },
    multiple: Boolean,
    noClear: Boolean,
    noDenseCounter: Boolean,
    noOnly: Boolean,
    noReverse: Boolean,
    noSelectAll: Boolean,
    request: Function
  },

  data () {
    return {
      focused: false,
      hovering: false,
      opts: [],
      needle: ''
    }
  },

  created () { this.resetOptions() },

  computed: {
    selectProps () {
      return {
        ...this.$attrs,
        clearable: !this.noClear,
        useInput: true,
        emitValue: true,
        mapOptions: true,
        optionsDense: true,
        optionsSanitize: true,
        value: this.value,
        options: this.opts,
        multiple: this.multiple,
        inputDebounce: 300
      }
    },
    selectEvents () {
      return {
        input: this.ok,
        filter: this.search,
        'input-value': filter => { this.needle = filter },
        'popup-show': () => { this.focused = true },
        'popup-hide': () => { this.focused = false }
      }
    },
    displayValue () {
      if (!this.value || !this.multiple || this.value.length === 0) return null
      return this.opts.filter(({ value }) => this.value.includes(value)).map(({ label }) => label).join(', ')
    },

    isLazy () { return !!this.url && !!this.request },
    highlight () {
      return label => {
        const regex = new RegExp(`(${this.needle})`, 'ig')
        const replace = `<span class="bg-${this.highlightColor} text-white">$1</span>`
        return label.replace(regex, replace)
      }
    },
    haveToEmit () {
      return !this.multiple &&
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
    setOptions (options) { this.$set(this, 'opts', options) },
    resetOptions () { this.setOptions(this.parseOptions(this.options)) },
    async prepareOptions () {
      if (this.isLazy) this.setOptions(await this.getOptions())
      else if (this.options.length > 0) this.resetOptions()
    },
    async getOptions (filter) {
      const params = { filter, ...this.url.filters }
      const { data } = await this.request(this.url.route, { params })
      return this.parseOptions(data)
    },
    parseOptions (options) {
      return typeof options[0] === 'string'
        ? options.map(item => ({ label: item, value: item }))
        : options.map(({ value, label, disable, ...item }) => ({
          value: value || item[this.$attrs['option-value']],
          label: label || item[this.$attrs['option-label']],
          disable: disable || item[this.$attrs['option-disable']],
          item: this.haveToEmit ? item : undefined
        }))
    },
    invertSelection () {
      const values = this.opts.map(({ value }) => value).filter(val => !this.value.includes(val))
      this.$emit('input', values)
    },
    selectAll () {
      const values = this.opts.map(({ value }) => value)
      this.$emit('input', values)
    },
    only (value) { this.$emit('input', [value]) },
    ok (newVal) {
      this.$emit('input', newVal)
      if (this.haveToEmit && newVal) {
        const { item } = this.opts.find(({ value }) => value === newVal)
        if (item) this.$emit('item', item)
      }
    },
    searchFn (item, filter) {
      return item.label.toLowerCase().indexOf(filter.toLowerCase()) > -1
    },
    async search (filter, doneFn) {
      await this.prepareOptions()

      doneFn(() => {
        this.setOptions(this.opts.filter(item => this.searchFn(item, filter)))
      })
    }
  }
}
</script>
