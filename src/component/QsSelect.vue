<template>
  <q-select v-bind="selectProps" v-on="selectEvents">

    <template v-if="value && ((multiple && value.length > 0) || opts.findIndex(opt => $refs.select && $refs.select.getOptionValue(opt) === value) !== -1)" #selected>
      <template v-if="multiple">
        <span class="ellipsis" style="max-width: 190px" v-if="(value.length === 1 || noDenseCounter)">
          {{ $refs.select && $refs.select.selectedString }}
        </span>
        <template v-else>
          {{ $q.lang.table.selectedRecords(value.length) }}
          <q-tooltip max-width="40vw" :content-class="{ 'text-caption': value.length < 5 }">
            {{ $refs.select && $refs.select.selectedString }}
          </q-tooltip>
        </template>
      </template>
      <template v-else>
        {{ $refs.select.getOptionLabel($refs.select.__getOption(value)) }}
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
          <q-item-label v-html="highlight($refs.select.getOptionLabel(opt))" />
          <q-item-label caption v-if="$scopedSlots['option-caption']">
            <slot name="option-caption" :opt="opt" />
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="!noOnly && multiple && focused && hovering">
          <q-btn size="14px" padding="none sm" flat :text-color="`${$attrs.color}`" :label="$q.lang.label.select" no-caps @click.prevent.stop="only($refs.select.getOptionValue(opt))" />
        </q-item-section>
        <q-item-section side v-if="$scopedSlots['option-side']">
          <slot name="option-side" :opt="opt" />
        </q-item-section>
      </q-item>
    </template>

    <template #no-option="{ inputValue }">
      <slot name="no-option" v-bind="inputValue">
        <q-item dense>
          <q-item-section class="text-grey">
            {{ inputValue ? $q.lang.table.noResults : $q.lang.table.noData }}
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
      // type: [Array, String, Number],
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
    minLength: {
      type: [String, Number],
      validator: length => length > 1
    },

    route: String,
    filterKey: String,
    filters: Object,

    freeze: Boolean,
    multiple: Boolean,
    noClear: Boolean,
    noInput: Boolean,
    noClientSearch: Boolean,
    noDenseCounter: Boolean,
    noOnly: Boolean,
    noReverse: Boolean,
    noSelectAll: Boolean
  },

  data () {
    return {
      loading: false,
      opened: false,
      hovering: false,
      opts: []
    }
  },

  computed: {
    selectProps () {
      const attrKeys = Object.keys(this.$attrs)
      return {
        optionsDense: true,
        optionsSanitize: true,
        ...this.$attrs,
        ref: 'select',
        clearable: !this.noClear,
        useInput: !this.noInput && !attrKeys.includes('readonly') && !attrKeys.includes('disable'),
        emitValue: true,
        mapOptions: true,
        value: this.value,
        options: this.opts,
        loading: this.loading,
        multiple: this.multiple,
        inputDebounce: 300
      }
    },
    selectEvents () {
      return {
        input: value => this.$emit('input', value),
        filter: this.search,
        'popup-show': () => { this.opened = true },
        'popup-hide': () => { this.opened = false }
      }
    },

    highlight () {
      return label => {
        const regex = new RegExp(`(${this.$refs.select.inputValue})`, 'ig')
        const replace = `<span class="${this.highlightClass}">$1</span>`
        return label.replace(regex, replace)
      }
    },
    haveToEmit () {
      return !this.multiple &&
        this.route &&
        Object.keys(this.$listeners).includes('item')
    },
    hoverEvents () {
      return this.noOnly
        ? {}
        : {
          mouseenter: () => { this.hovering = true },
          mouseleave: () => { this.hovering = false }
        }
    }
  },

  watch: {
    options () { this.resetOptions() },
    value: {
      immediate: true,
      async handler (value) {
        if (value) {
          if (this.opts.length === 0) await this.checkDisplayValue()
          this.haveToEmit && this.$emit('item', this.$refs.select.__getOption(value))
        }
      }
    }
  },

  methods: {
    showPopup () { this.$refs.select.showPopup() },
    hidePopup () { this.$refs.select.hidePopup() },

    // options
    resetOptions () { this.setOptions(this.options) },
    async checkDisplayValue () {
      if (this.route) {
        const optionValue = this.$attrs['option-value'] || 'value'
        const filters = { [optionValue]: Array.isArray(this.value) ? [this.value] : this.value }
        this.setOptions(await this.fetchOptions(filters))
      } else this.resetOptions()
    },
    setOptions (options) {
      this.freeze && Object.freeze(options)
      this.opts = options
    },
    async prepareOptions () {
      if (this.options.length > 0) this.resetOptions()
      else if (this.route) this.setOptions(await this.fetchOptions())
    },
    async fetchOptions (defaultFilters = {}) {
      this.loading = true
      let data
      const params = { ...defaultFilters, ...this.filters }
      if (process.env._QsSelect.api_type === 'fetch') {
        const options = { headers: { Accept: 'application/json' } }
        const searchParams = new URLSearchParams()
        for (const [key, value] of Object.entries(params)) {
          if (Array.isArray(value)) value.forEach(param => searchParams.append(key + '[]', param))
          else searchParams.append(key, value)
        }
        data = await (await fetch(`${this.route}?${searchParams}`, options)).json()
      } else {
        if (this.$refs.select) params[this.filterKey || 'filter'] = this.$refs.select.inputValue
        data = (await this[process.env._QsSelect.axios_key].get(this.route, { params })).data
      }
      this.loading = false
      return Array.isArray(data) ? data : [data]
    },

    // features
    only (value) { this.multiple && this.$emit('input', [value]) },
    invertSelection () {
      const values = this.opts
        .map(this.$refs.select.getOptionValue)
        .filter(val => !this.value.includes(val))
      this.$emit('input', values)
    },
    selectAll () {
      const values = this.opts.map(this.$refs.select.getOptionValue)
      this.$emit('input', values)
    },

    // search
    searchFn (filter) {
      return opt => this.$refs.select.getOptionLabel(opt)
        .toLowerCase()
        .indexOf(filter.toLowerCase()) > -1
    },
    async search (filter, doneFn, abortFn) {
      if (this.route && this.minLength && filter.length < this.minLength) abortFn()
      else {
        await this.prepareOptions()

        doneFn(() => {
          const results = this.noClientSearch
            ? this.opts
            : this.opts.filter(this.searchFn(filter))
          this.setOptions(results)
        })
      }
    }
  }
}
</script>
