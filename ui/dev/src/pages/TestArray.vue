<template>
  <q-page padding>
    <q-badge>{{filter}}</q-badge>
    <QsSelect dense v-model="filter" :options="array" />

    <teleport to="#pre-list">
      <div>{{array}}</div>
    </teleport>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const array = ref([])
    fetch('array.json').then(res => res.json()).then(data => { array.value = data })
    return {
      filter: ref(null),
      array
    }
  }
}
</script>
