<template>
  <q-page padding>
    <q-badge>{{filter}}</q-badge>
    <QsSelect dense v-model="filter" freeze :options="large_objects" />

    <teleport to="#pre-list">
      <div>{{large_objects}}</div>
    </teleport>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    // NOT WORKING - Error: 
    // Uncaught (in promise) TypeError: proxy must report the same value for the non-writable, non-configurable property '0'

    const large_objects = ref([])
    fetch('large_objects.json').then(res => res.json()).then(data => { large_objects.value = data })
    return {
      filter: ref(null),
      large_objects
    }
  }
}
</script>
