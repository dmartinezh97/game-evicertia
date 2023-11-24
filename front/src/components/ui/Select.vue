<script setup lang="ts">
import { computed, onMounted, ref, type CSSProperties, type PropType } from 'vue';
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { getPropertyFromItem } from '../../utils/shared/helpershelpers'
import IconArrowDown from '../icons/IconArrowDown.vue';
import IconCheck from '../icons/IconCheck.vue';
import type { SelectItemKey } from "@/types/app"

let selectText = ref("");
let selectImage = ref("");
let selectValue = ref();

const props = withDefaults(defineProps<{
  label?: string,
  placeholder?: string,
  items: object[],
  imageOption?: boolean,
  returnObject?: boolean,
  itemImg?: string,
  itemText?: string,
  itemValue?: string,
  modelValue: [string, Number, Object],
}>(), {
  placeholder: "- Selecciona una opción -",
  returnObject: false,
  itemImg: "img",
  itemText: "text",
  itemValue: "value",
});

// const props = defineProps({
//   label: {
//     type: String,
//     required: false
//   },
//   placeholder: {
//     type: String,
//     default: '- Selecciona una opción -',
//     required: false
//   },
//   items: {
//     type: Object,
//     required: true
//   },
//   imageOption: {
//     type: Boolean,
//     required: false
//   },
//   returnObject: {
//     type: Boolean,
//     default: false,
//     required: false
//   },
//   itemImg: {
//     type: String,
//     default: 'img',
//     required: false
//   },
//   itemText: {
//     type: [String, Array, Function] as PropType<SelectItemKey>,
//     default: 'text',
//   },
//   itemValue: {
//     type: [String, Array, Function] as PropType<SelectItemKey>,
//     default: 'value',
//   },
//   modelValue: {
//     type: [String, Number, Object],
//     required: false
//   },
// })

onMounted(() => {
  selectValue.value = props.items.find((element: Object) => {
    let esCorrecto = props.modelValue == getValue(element)
    if(esCorrecto) selectText.value = getText(element)
    return esCorrecto
  });
})

const getText = (item: object) => {
  return getPropertyFromItem(item, props.itemText, item)
};

const getImage = (item: object) => {
  return getPropertyFromItem(item, props.itemImg, item)
};

const getValue = (item: object) => {
  return getPropertyFromItem(item, props.itemValue, getText(item))
};

const emit = defineEmits(['update:modelValue', 'change'])
const updateValue = (e: Event) => {
  selectValue.value = e
  selectText.value = getText(e)
  if(props.imageOption) selectImage.value = getImage(e)
  if(props.returnObject){
    emit('update:modelValue', e)
    emit('change', e)
  }else{
    emit('update:modelValue', getValue(e))
    emit('change', getValue(e))
  }
};

</script>

<template>
  <div class="mb-4">
    <Listbox :modelValue="selectValue" @update:modelValue="updateValue">
      <ListboxButton
        class="border border-gray-300 w-full rounded-md focus-within:border-uno-500">
        <div class="flex select relative px-2 py-2">
          <img v-if="props.imageOption && selectImage" class="absolute w-6 h-6 rounded-full top-1/2 left-2 transform -translate-y-1/2" :src="selectImage">
          <slot v-else name="icon-placeholder"></slot>
          <span :class="[ props.imageOption && selectImage ? 'pl-8' : '']" class="block truncate text-left">{{ selectText ? selectText : `- ${props.placeholder} -` }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2">
            <IconArrowDown></IconArrowDown>
          </span>
          <label class="absolute top-1/2 z-1 duration-300 bg-white">{{props.label}}</label>
        </div>
      </ListboxButton>
  
      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute z-1 mt-1 max-h-60 border border-gray-200 divide-y divide-gray-200 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <slot name="header"></slot>
          <ListboxOption v-slot="{ active, selected }" v-for="item in props.items" :value="item" :key="getValue(item)">
            as="template">
            <li :class="[
              active ? 'bg-uno-100 text-primary-900' : 'text-gray-900',
              'relative cursor-pointer select-none py-2 pl-10 pr-4',
            ]">
              <img v-if="props.imageOption" class="absolute w-6 h-6 rounded-full top-1/2 left-2 transform -translate-y-1/2" :src="getImage(item)">
              <span v-else-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                <IconCheck></IconCheck>
              </span>
              <span :class="[
                selected ? 'font-medium' : 'font-normal',
                'block truncate',
              ]">{{ getText(item) }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>