<script setup lang="ts">
import { isString } from '@vue/shared';
import { computed, onMounted, type CSSProperties, type PropType, ref } from 'vue';
import { SizeEnum } from '../../enums/sizeEnum';
import { ButtonStyleEnum, ButtonShadowEnum } from '../../enums/buttonEnum';

const valueLocal = ref("F")

const props = withDefaults(defineProps<{
  text?: string,
  disabled?: boolean,
  modelValue: boolean,
}>(), {
  disabled: false,
  modelValue: false,
});

onMounted(() => {
  valueLocal.value = props.modelValue ? "T" : "F"
})

const emit = defineEmits(['update:modelValue'])
const updateValue = (e: Event) => {
    valueLocal.value = valueLocal.value === "T" ? "F" : "T";
  emit('update:modelValue', valueLocal.value == "T")
};

const classObject = computed(() => ({
  'bg-gray-200': !props.modelValue,
  'bg-uno-500': props.modelValue,
}))

const classSpanObject = computed(() => ({
  'translate-x-0': !props.modelValue,
  'translate-x-5': props.modelValue,
}))


</script>

<template>
    <label class="text-gray-600 font-medium mb-1">{{ props.text }}</label>
    <div class="py-2">
        <button
            :value="valueLocal"
            @click="updateValue"
            type="button"
            role="switch"
            aria-checked="false"
            :class="classObject"
            class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-transparent  transition focus:outline-none focus:ring focus:ring-blue-200">
            <span aria-hidden="true" :class="classSpanObject" class="pointer-events-none inline-block h-6 w-6 rounded-full bg-white transition will-change-transform"></span>
        </button>
    </div>
</template>