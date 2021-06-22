<template>
  <q-page padding>
    <q-badge>{{filter}}</q-badge>
    <QsSelect dense freeze v-model="filter" :options="large_array" />

    <teleport to="#pre-list">
      <div>{{large_array}}</div>
    </teleport>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const large_array = ref([])
    fetch('large_array.json').then(res => res.json()).then(data => { large_array.value = data })
    return {
      filter: ref(null),
      large_array
    }
  }
}
</script>
