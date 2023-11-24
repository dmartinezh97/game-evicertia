<script setup lang="ts">
import { isString } from '@vue/shared';
import IconEye from '../icons/IconEye.vue';
import IconEyeCerrado from '../icons/IconEyeCerrado.vue';
import { SizeEnum } from '../../enums/sizeEnum';
import { computed, onMounted, type PropType } from 'vue';
import { ToastTypeEnum } from '../../enums/toastEnum';
import IconSuccess from '../icons/IconSuccess.vue';
import IconWarning from '../icons/IconWarning.vue';
import IconError from '../icons/IconError.vue';
import { useToastStore } from '@/stores/modulos/toast';
import type { ToastProps } from './typing';

const toastStore = useToastStore();

const props = defineProps({
  id: {
    type: String,
    required: false
  },
  msg: {
    type: String,
    required: true
  },
  size: {
    type: String as PropType<SizeEnum>,
    default: SizeEnum.DEFAULT,
    required: false
  },
  time: {
    type: Number as PropType<number>,
    default: 3000,
    required: false
  },
  type: {
    type: String as PropType<ToastTypeEnum>,
    default: ToastTypeEnum.DEFAULT,
    required: false
  }
})

onMounted(() => {
  setTimeout(() => {
    if(props.id)
      toastStore.clearToast(props.id)
  }, props.time);
})

const classSizeObject = computed(() => ({
  'p-1.5': SizeEnum.XSMALL == props.size,
  'p-2': SizeEnum.SMALL == props.size,
  'p-3': SizeEnum.LARGE == props.size || SizeEnum.DEFAULT == props.size,
}))

const classTypeObject = computed(() => ({
  'text-green-500 bg-green-100': ToastTypeEnum.DEFAULT == props.type || ToastTypeEnum.SUCCESS == props.type,
  'text-orange-500 bg-orange-100': ToastTypeEnum.WARNING == props.type,
  'text-red-500 bg-red-100 ': ToastTypeEnum.ERROR == props.type,
}))

</script>

<template>
  <div
    id="toast-success"
    :class="classSizeObject"
    class="flex items-center mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow"
    role="alert"
  >
    <div
      class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg"
      :class="classTypeObject"
    >
      <IconSuccess
        v-if="props.type == ToastTypeEnum.SUCCESS || props.type == ToastTypeEnum.DEFAULT"
        class="w-5 h-5"
      ></IconSuccess>
      <IconWarning v-else-if="props.type == ToastTypeEnum.WARNING" class="w-5 h-5"></IconWarning>
      <IconError v-else-if="props.type == ToastTypeEnum.ERROR" class="w-5 h-5"></IconError>
    </div>
    <div class="ml-3 text-sm font-normal">{{ props.msg }}</div>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
      data-collapse-toggle="toast-success"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>