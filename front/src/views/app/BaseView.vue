<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from "@componentes/layouts/Navbar.vue";

</script>

<template>
  <div class="flex flex-col h-full">
    <Navbar></Navbar>
    <div class="flex w-full h-full p-4">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </div>
  </div>
</template>