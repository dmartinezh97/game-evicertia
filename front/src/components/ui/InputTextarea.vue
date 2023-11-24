<script setup lang="ts">
import { isString } from '@vue/shared';
import { computed, onMounted, ref, type CSSProperties, type PropType } from 'vue';
import { SizeEnum } from '../../enums/sizeEnum';
import IconEye from '../icons/IconEye.vue';
import IconEyeCerrado from '../icons/IconEyeCerrado.vue';

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  class: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: true,
    required: false
  },
  modelValue: {
    type: String,
    default: '',
    required: false
  },
})

const emit = defineEmits(['update:modelValue'])
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};

const classInputObject = computed(() => ({
  'bg-gray-200': props.disabled,
}))

</script>

<template>
  <template v-if="editable">
    <div class="flex flex-col" :class="class">
      <label v-if="props.label" class="text-gray-600 font-medium mb-1">{{ props.label }}</label>
      <textarea
        :value="modelValue"
        :disabled="disabled"
        @input="updateValue"
        :class="classInputObject"
        :placeholder="props.placeholder"
        spellcheck="false"
        rows="4"
        class="block w-full font-light text-base bg-primary text-black placeholder:text-gray-300 rounded-lg py-2 px-4 border border-gray-300 focus:border focus:outline-none focus:border-uno-500 focus:ring-none"
      ></textarea>  
    </div>
  </template>
  <template v-else>
    <slot name="content">
    </slot>
  </template>
</template>