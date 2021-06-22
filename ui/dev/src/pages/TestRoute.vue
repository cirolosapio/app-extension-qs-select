<template>
  <q-page padding>
    <q-badge>{{filter}}</q-badge>
    <q-option-group inline v-model="route" :options="['array', 'large_array','objects', 'large_objects'].map(v => ({ label: v, value: v }))" />
    <QsSelect dense freeze v-model="filter" :route="route + '.json'" />
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    return {
      filter: ref(null),
      route: ref('array'),
    }
  }
}
</script>
