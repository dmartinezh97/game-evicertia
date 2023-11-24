<script setup lang="ts">
import { isString } from '@vue/shared';
import { SizeEnum } from '../../enums/sizeEnum';
import { computed, onMounted, type PropType } from 'vue';
import { ToastTypeEnum } from '../../enums/toastEnum';
import { useToastStore } from '@/stores/modulos/toast';
import type { ToastProps } from './typing';

const toastStore = useToastStore();

const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<ToastTypeEnum>,
    default: ToastTypeEnum.INFO,
    required: false
  }
})

onMounted(() => {
  setTimeout(() => {
    deleteToast()
  }, 3500);
})

const deleteToast = () => {
  toastStore.clearToast(props.msg)
}

</script>

<template>
  <div class="flex w-full min-w-[250px] max-w-sm mx-auto mb-4 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div v-if="props.type == ToastTypeEnum.SUCCESS" class="flex items-center justify-center w-12 min-w-[48px] bg-emerald-500">
          <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
          </svg>
      </div>
      <div v-else-if="props.type == ToastTypeEnum.WARNING" class="flex items-center justify-center w-12 min-w-[48px] bg-yellow-400">
             <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"/>
            </svg>
        </div>
      <div v-else-if="props.type == ToastTypeEnum.ERROR" class="flex items-center justify-center w-12 min-w-[48px] bg-red-500">
          <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"/>
          </svg>
      </div>
      <div v-else class="flex items-center justify-center w-12 min-w-[48px] bg-blue-500">
          <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"/>
          </svg>
      </div>
      
      <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
              <span v-if="props.type == ToastTypeEnum.SUCCESS" class="font-semibold text-emerald-500 dark:text-emerald-400">Bien</span>
              <span v-else-if="props.type == ToastTypeEnum.WARNING" class="font-semibold text-yellow-400 dark:text-yellow-300">Cuidado</span>
              <span v-else-if="props.type == ToastTypeEnum.ERROR" class="font-semibold text-red-500 dark:text-red-400">Error</span>
              <span v-else class="font-semibold text-blue-500 dark:text-blue-400">Info</span>
              <p class="text-sm text-gray-600 dark:text-gray-200">{{ props.msg }}</p>
          </div>
      </div>
  </div>
        
</template>