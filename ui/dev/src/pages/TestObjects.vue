<template>
  <q-page padding>
    <q-badge>{{filter}}</q-badge>
    <QsSelect dense v-model="filter" :options="objects" />

    <teleport to="#pre-list">
      <div>{{objects}}</div>
    </teleport>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const objects = ref([])
    fetch('objects.json').then(res => res.json()).then(data => { objects.value = data })
    return {
      filter: ref(null),
      objects
    }
  }
}
</script>
