<template>
  <q-select v-bind="selectProps" v-on="selectEvents">
    <template v-if="modelValue && ((multiple && modelValue.length > 0) || opts.findIndex(opt => select.getEmittingOptionValue(opt) === modelValue) !== -1)" #selected> <!-- getOptionValue https://github.com/quasarframework/quasar/issues/9427 -->
      <template v-if="multiple">
        <span class="ellipsis" style="max-width: 190px" v-if="(modelValue.length === 1 || noDenseCounter)">
          {{ selectedString }}
        </span>
        <template v-else>
          {{ $q.lang.table.selectedRecords(modelValue.length) }}
          <q-tooltip max-width="40vw" :content-class="{ 'text-caption': modelValue.length < 5 }">
            {{ selectedString }}
          </q-tooltip>
        </template>
      </template>
      <template v-else>
        {{ __getOptionLabel(__getOption(modelValue)) }} <!-- {{ select.getOptionLabel(__getOption(modelValue)) }} https://github.com/quasarframework/quasar/issues/9427 -->
      </template>
    </template>

    <template #append>
      <slot name="append" />
      <transition-group appear :name="transition" v-if="multiple && opened">
        <q-icon name="mdi-check-box-multiple-outline" class="cursor-pointer" v-if="!noSelectAll && opts.length !== (modelValue || []).length" key="select-all" @click.prevent.stop="selectAll" />
        <q-icon name="mdi-swap-vertical" class="cursor-pointer" v-if="!noReverse" key="invert-selection" @click.prevent.stop="invertSelection" />
      </transition-group>
    </template>

    <template #option="{ itemProps, opt, focused, label }">
      <q-item v-bind="itemProps" v-on="hoverEvents">
        <q-item-section>
          <q-item-label>{{label}}</q-item-label>
          <q-item-label caption v-if="$slots['option-caption']">
            <slot name="option-caption" :opt="opt" />
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="!noOnly && multiple && focused && hovering">
          <q-btn size="14px" padding="none sm" flat :text-color="`${$attrs.color}`" :label="$q.lang.label.select" no-caps @click.prevent.stop="only(select.getEmittingOptionValue(opt))" /> <!-- getOptionValue https://github.com/quasarframework/quasar/issues/9427 -->
        </q-item-section>
        <q-item-section side v-if="$slots['option-side']">
          <slot name="option-side" :opt="opt" />
        </q-item-section>
        <slot name="extra-side" :opt="opt" v-if="$slots['extra-side']" />
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
import { ref, computed, watch } from 'vue'
import { isDeepEqual } from 'quasar/src/utils/private/is'
import useTransition, { useTransitionProps } from 'quasar/src/composables/private/use-transition'
import { api } from 'boot/axios'
export default {
  name: 'QsSelect',
  inheritAttrs: false,
  props: {
    ...useTransitionProps,
    modelValue: { required: true }, // type: [Array, String, Number],
    options: { type: Array, default: () => [] },
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
    watchFilters: Boolean,
    noClientSearch: Boolean,
    noDenseCounter: Boolean,
    noOnly: Boolean,
    noReverse: Boolean,
    noSelectAll: Boolean
  },

  setup (props, ctx) {
    const { transition } = useTransition(props, false)

    const loading = ref(false)
    const opened = ref(false)
    const hovering = ref(false)

    const select = ref(null)
    const opts = ref([])
    const __inputValue = ref(null)

    // helpers
    const __getOptionLabel = opt => typeof opt === 'object' ? opt.label : opt
    const searchFn = filter => opt => String(__getOptionLabel(opt)).toLowerCase().indexOf(filter.toLowerCase()) > -1 // select.value.getOptionLabel https://github.com/quasarframework/quasar/issues/9427
    const __getOption = computed(() => value => {
      const fn = opt => isDeepEqual(select.value.getEmittingOptionValue(opt), value) // select.value.getOptionValue https://github.com/quasarframework/quasar/issues/9427
      return opts.value.find(fn) || props.options.find(fn) || value
    })

    const canFetch = computed(() => !props.minLength || (props.minLength && props.minLength <= __inputValue.value.length))
    const selectedString = computed(() => props.modelValue.map(val => __getOptionLabel(__getOption.value(val))).join(', ')) // select.value.getOptionLabel https://github.com/quasarframework/quasar/issues/9427
    const selectEvents = computed(() => {
      return {
        input: val => ctx.emit('update:modelValue', val),
        filter: search,
        'input-value': val => { __inputValue.value = val },
        'popup-show': () => { opened.value = true },
        'popup-hide': () => { opened.value = false }
      }
    })
    const selectProps = computed(() => ({
      optionsDense: true,
      ...ctx.attrs,
      ref: 'select',
      clearable: !props.noClear,
      useInput: !props.noInput,
      emitValue: true,
      mapOptions: true,
      modelValue: props.modelValue,
      options: opts.value,
      loading: loading.value,
      multiple: props.multiple,
      inputDebounce: 300
    }))
    const haveToEmit = computed(() => !props.multiple && props.route && Object.keys(ctx.attrs).includes('item'))
    const hoverEvents = computed(() => props.noOnly ? {} : {
      mouseenter: () => { hovering.value = true },
      mouseleave: () => { hovering.value = false }
    })

    // options
    const resetOptions = () => { setOptions(props.options) }
    const setOptions = options => {
      const haveToFreeze = props.freeze ? true : Boolean(props.route)
      haveToFreeze && Object.freeze(options)
      opts.value = options
    }
    const prepareOptions = async () => {
      if (props.options.length > 0) resetOptions()
      else if (props.route) setOptions(await fetchOptions())
    }
    const search = async (filter, doneFn, abortFn) => {
      if (!canFetch.value) abortFn()
      else {
        await prepareOptions()

        doneFn(
          () => {
            const haveToSearch = props.noClientSearch ? false : !props.route
            const results = haveToSearch
              ? opts.value.filter(searchFn(filter))
              : opts.value
            setOptions(results)
          },
          el => {
            if (filter !== '' && el.options.length > 0) {
              el.setOptionIndex(-1)
              el.moveOptionSelection(1, true)
            }
          }
        )
      }
    }
    const fetchOptions = async (defaultFilters = {}) => {
      loading.value = true
      let data
      const params = { ...defaultFilters, ...props.filters }
      if (select) params[props.filterKey || 'filter'] = __inputValue.value
      data = (await api.get(props.route, { params })).data
      loading.value = false
      return Array.isArray(data) ? data : [data]
    }

    // features
    const showPopup = () => { select.value.showPopup() }
    const hidePopup = () => { select.value.hidePopup() }
    const only = val => { props.multiple && ctx.emit('update:modelValue', [val]) }
    const selectAll = () => { ctx.emit('update:modelValue', opts.value.map(select.value.getEmittingOptionValue)) } // getOptionValue
    const invertSelection = () => { ctx.emit('update:modelValue', opts.value.filter(opt => !props.modelValue.includes(select.value.getEmittingOptionValue(opt)))) } // getOptionValue

    const checkDisplayValue = async () => {
      if (!props.route) resetOptions()
      else {
        const optionValue = ctx.attrs['option-value'] || 'value'
        const filters = { [optionValue]: Array.isArray(props.modelValue) ? [props.modelValue] : props.modelValue }
        setOptions(await fetchOptions(filters))
      }
    }

    watch(props.options, () => { resetOptions() })
    watch(props.filters, async () => { props.watchFilters && canFetch.value && await prepareOptions() })
    watch(
      props.modelValue,
      async val => {
        if (val && (!props.multiple || (props.multiple && props.modelValue.length > 0))) {
          if (opts.value.length === 0) await checkDisplayValue()
          haveToEmit.value && ctx.emit('item', __getOption.value(val))
        }
      },
      { immediate: true }
    )

    return {
      select,

      transition,
      opened,
      hovering,
      opts,

      __getOption,
      __getOptionLabel, // not necessary https://github.com/quasarframework/quasar/issues/9427

      selectProps,
      selectEvents,
      selectedString,
      hoverEvents,

      showPopup,
      hidePopup,
      only,
      invertSelection,
      selectAll
    }
  }
}
</script>
