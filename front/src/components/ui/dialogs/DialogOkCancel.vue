<script setup lang="ts">
import BasicButton from '@/components/ui/buttons/BasicButton.vue';


const props = withDefaults(defineProps<{
    titulo?: string,
    descripcion?: string,
    ok?: string,
    cancelar?: string
    modelValue: boolean,
}>(), {
    ok: "Aceptar",
    cancelar: "Cancelar"
});

const emit = defineEmits(['update:modelValue', 'submit'])
const close = (e: Event) => {
    emit('update:modelValue', false)
};

const onClickOk = () => {
  emit('submit')
  emit('update:modelValue', false)
};

</script>

<template>
    <div class="fixed inset-0 z-50 bg-[#00000099]" v-show="props.modelValue">
        <div class="flex flex-col justify-center items-center h-full">
            <div class="p-8 bg-white rounded-lg shadow-2xl max-w-lg">
                <h2 class="text-lg font-bold">{{ props.titulo }}</h2>
                <p class="mt-2 text-gray-500">{{ props.descripcion }}</p>
                <div class="flex items-center justify-end mt-8">
                    <BasicButton :text="cancelar" @click="close" outlined class="mr-2"></BasicButton>
                    <BasicButton :text="ok" @click="onClickOk"></BasicButton>
                </div>
            </div>
        </div>
    </div>
</template>