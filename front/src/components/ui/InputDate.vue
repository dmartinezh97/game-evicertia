<script setup lang="ts">
import { isString } from '@vue/shared';
import { computed, onMounted, ref, type CSSProperties, type PropType } from 'vue';
import { SizeEnum } from '../../enums/sizeEnum';
import IconEye from '../icons/IconEye.vue';
import IconEyeCerrado from '../icons/IconEyeCerrado.vue';

const props = withDefaults(defineProps<{
  label?: string,
  class?: string,
  placeholder?: string,
  datetime?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  editable?: boolean,
  modelValue: [String, Date],
}>(), {
  editable: true,
  modelValue(props) {
    return props.modelValue || ''
  },
});

const emit = defineEmits(['update:modelValue'])
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};

const classInputObject = computed(() => ({
  'bg-gray-200': props.disabled,
}))

const inputType = computed(() => {
  return props.datetime ? 'datetime-local' : 'date'
})

</script>

<template>
  <template v-if="editable">
    <div class="flex flex-col" :class="class">
      <label v-if="props.label" class="text-gray-600 font-medium mb-1">{{ props.label }}</label>
      <input
        :type="inputType"
        :value="modelValue"
        :disabled="disabled"
        @input="updateValue"
        :class="classInputObject"
        :placeholder="props.placeholder"
        spellcheck="false"
        :readonly="readonly"
        class="block w-full font-light text-base bg-primary text-black placeholder:text-gray-300 rounded-lg py-2 px-4 border border-gray-300 focus:border focus:outline-none focus:border-uno-500 focus:ring-none"
      />
    </div>
  </template>
  <template v-else>
    <slot name="content">
    </slot>
  </template>
</template>