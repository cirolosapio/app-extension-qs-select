<template>
  <q-page padding>
    <q-expansion-item v-bind="expansionProps">
      <div class="row">
        <div class="col">
          <q-item-label header>Feature</q-item-label>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>No dense counter</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox :color="config.color" v-model="config.noDenseCounter" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>No clear</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox :color="config.color" v-model="config.noClear" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>No select all</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox :color="config.color" v-model="config.noSelectAll" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>No reverse</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox :color="config.color" v-model="config.noReverse" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>No only</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox :color="config.color" v-model="config.noOnly" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>No client search</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox :color="config.color" v-model="config.noClientSearch" />
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section>
              <q-item-label>Custom request search field</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-input dense input-class="text-right" :color="config.color" v-model="filterParam" />
            </q-item-section>
          </q-item>
        </div>
        <q-separator vertical spaced />
        <div class="col">
          <q-item-label header>Style</q-item-label>
          <q-item dense>
            <q-item-section>
              <q-item-label>Color</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-select :options="colors" :color="config.color" filled dense options-dense v-model="config.color" />
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section>
              <q-item-label>Hightlight Class</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-input dense filled :color="config.color" v-model="config.highlightClass" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>Dense</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox :color="config.color" v-model="config.dense" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>Filled</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-radio val="filled" :color="config.color" v-model="style" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>Borderless</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-radio val="borderless" :color="config.color" v-model="style" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>Standout</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-radio val="standout" :color="config.color" v-model="style" />
            </q-item-section>
          </q-item>
          <q-item tag="label" dense>
            <q-item-section>
              <q-item-label>Outlined</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-radio val="outlined" :color="config.color" v-model="style" />
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-expansion-item>

    <q-list dense padding bordered class="rounded-borders q-mb-md">
      <q-item-label header>Examples</q-item-label>
      <q-item v-for="(val, key) of examples" :key="key">
        <q-item-section>
          <qs-select v-bind="{ ...props(key) , ...options(key) }" v-model="model[key]" @item="notify">
            <template #default>
              <q-tooltip anchor="center left" self="center right" transition-show="jump-left" transition-hide="jump-right">
                <q-markdown>
```js
{{ props(key) }}
```
                </q-markdown>
              </q-tooltip>
            </template>
          </qs-select>
        </q-item-section>
        <q-item-section>
          <q-badge multi-line :outline="$q.dark.isActive" :color="config.color">{{ model[key] }}</q-badge>
        </q-item-section>
      </q-item>

      <q-item-label header class="q-mt-md">
        Freeze Prop
        <small class="text-grey q-ml-xs">for render performance</small>
      </q-item-label>
      <q-item v-for="(val, key) in freezeExamples" :key="key">
        <q-item-section>
          <qs-select freeze v-bind="{ ...props(key) , ...freezeOptions(key) }" v-model="model[key]">
            <template #default>
              <q-tooltip anchor="center left" self="center right" transition-show="jump-left" transition-hide="jump-right">
                <q-markdown>
```js
{{ props(key) }}
```
                </q-markdown>
              </q-tooltip>
            </template>
          </qs-select>
        </q-item-section>
        <q-item-section>
          <q-badge multi-line :outline="$q.dark.isActive" :color="config.color">{{ model[key] }}</q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import languages from 'quasar/lang/index.json'
export default {
  name: 'Index',
  data () {
    return {
      model: {
        single_array: null,
        single_objects: null,
        multiple_array: null,
        multiple_objects: null,

        lazy_single_array: null,
        lazy_single_objects: null,
        lazy_multiple_array: null,
        lazy_multiple_objects: null,

        single_large_array: null,
        single_large_objects: null,
        multiple_large_array: null,
        multiple_large_objects: null,

        lazy_single_large_array: null,
        lazy_single_large_objects: null,
        lazy_multiple_large_array: null,
        lazy_multiple_large_objects: null
      },

      array: [],
      objects: [],
      large_array: [],
      large_objects: [],
      large: [],
      config: {
        dense: true,
        noDenseCounter: false,
        noSelectAll: false,
        noClientSearch: false,
        noReverse: false,
        noOnly: false,
        noClear: false,
        color: 'blue'
      },
      filterParam: 'filter',
      style: 'filled',

      locale: this.$q.lang.isoName,
      langOptions: [],
      colors: ['blue', 'green', 'purple', 'orange', 'red', 'brown', 'blue-grey', 'teal', 'amber', 'yellow', 'cyan', 'black', 'grey']
    }
  },

  async created () {
    this.langOptions = languages.map(lang => ({
      label: lang.nativeName, value: lang.isoName
    }))

    this.array = (await this.$axios.get('array.json')).data
    this.objects = (await this.$axios.get('objects.json')).data
    this.large_array = (await this.$axios.get('large_array.json')).data
    this.large_objects = (await this.$axios.get('large_objects.json')).data
  },

  computed: {
    examples () {
      return Object.fromEntries(Object.entries(this.model).filter(([key]) => !key.includes('large')))
    },
    freezeExamples () {
      return Object.fromEntries(Object.entries(this.model).filter(([key]) => key.includes('large')))
    },
    props () {
      return key => {
        return {
          [this.style]: true,
          multiple: key.includes('multiple'),
          label: key.replaceAll('_', ' '),
          ...this.config
        }
      }
    },
    options () {
      return key => {
        if (key.includes('lazy')) return { url: { route: key.includes('array') ? 'array.json' : 'objects.json', filterParam: this.filterParam, instance: this.$axios.get } }
        return { options: key.includes('array') ? this.array : this.objects }
      }
    },
    freezeOptions () {
      return key => {
        if (key.includes('lazy')) return { url: { route: key.includes('array') ? 'large_array.json' : 'large_objects.json', filterParam: this.filterParam, instance: this.$axios.get } }
        return { options: key.includes('array') ? this.large_array : this.large_objects }
      }
    },
    expansionProps () {
      return {
        icon: 'mdi-cog',
        class: 'overflow-hidden q-mb-md' + (this.$q.dark.isActive ? '' : ' shadow-1'),
        style: 'border-radius: 30px',
        label: 'Configuration',
        headerClass: (this.$q.dark.isActive ? 'bg-grey-9' : `bg-${this.config.color} text-white`),
        expandIconClass: 'text-white'
      }
    }
  },

  watch: {
    locale (lang) {
      import(`quasar/lang/${lang}`).then(lang => {
        this.$q.lang.set(lang.default)
      })
    }
  },

  methods: {
    notify (item) {
      this.$q.notify({
        message: JSON.stringify(item),
        caption: 'event emitted: @item'
      })
    }
  }
}
</script>
