<template>
  <q-layout view="hHh lpR lFr">
    <q-header elevated>
      <q-toolbar :class="{ 'bg-dark' : $q.dark.isActive }">
        <q-btn flat dense round to="/" icon="mdi-home" />

        <q-toolbar-title>
          quasar-ui-qs-select v{{ version }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <q-btn flat round icon="mdi-theme-light-dark" @click="$q.dark.toggle()" class="q-ml-sm" dense />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer behavior="desktop" v-model="rightDrawerOpen" side="right" bordered>
      <div class="fit column">
        <div class="col-auto">
          <q-item-label header>OPTIONS</q-item-label>
        </div>
        <div class="col">
          <q-scroll-area class="full-height">
            <pre id="pre-list"></pre>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>
  </q-layout>
</template>

<script>
import { version } from 'ui' // "ui" is aliased in quasar.conf.js
import { ref } from 'vue'

export default {
  name: 'MyLayout',

  setup () {
    return {
      version,
      rightDrawerOpen: ref(true)
    }
  }
}
</script>
