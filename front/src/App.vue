<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toasts from './components/Toasts/Toasts.vue'
import Loading from './components/ui/loaders/Loading.vue';
import { useAppStore } from './stores/modulos/app';
import DialogCookies from './components/layouts/dialogs/DialogCookies.vue';

const appStore = useAppStore();

</script>

<template>
  <div id="appBase">
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </router-view>
    <Loading v-model="appStore.getPageLoading"></Loading>
    <Toasts></Toasts>
    <DialogCookies></DialogCookies>
  </div>
</template>

<style>
@import '@/assets/base.css';
</style>
