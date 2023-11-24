<script setup lang="ts">
import { ref, onMounted, onDeactivated, reactive } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from '@headlessui/vue'
import BasicButton from '../buttons/BasicButton.vue'
import InputText from '../InputText.vue'
import type { LoginParams } from '@/api/model/userModel';
import { useUserStore } from '@/stores/modulos/user';
import { getEnv } from '@/utils/shared/envUtils';

const props = defineProps<{
    modelValue: boolean
}>();

const emit = defineEmits(['update:modelValue'])
const setIsOpen = (value: boolean) => {
    emit('update:modelValue', value)
};

</script>

<template>
    <Dialog :open="props.modelValue" @close="setIsOpen" class="fixed inset-0 z-30 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full py-8 px-1 md:p-8">
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
            <div class="relative w-full max-w-lg mx-auto bg-white rounded-xl">
                <div class="p-6">
                    Cargando...
                </div>
            </div>
        </div>
    </Dialog>
</template>