<script setup lang="ts">import { useToastStore } from '@/stores/modulos/toast';
import { computed } from 'vue';
import Toast from './Toast.vue';

const toastStore = useToastStore();

const getToasts = computed(() => {
  return toastStore.toasts;
})

</script>

<template>
  <div class="fixed z-50 bottom-2 right-2 md:bottom-10 md:right-10" v-if="getToasts.length">
    <Toast v-for="(toast, index) in getToasts" :key="index" :msg="toast.msg" :type="toast.type"></Toast>
  </div>
</template>