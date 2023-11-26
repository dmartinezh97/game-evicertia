<script setup lang="ts">
import { ref, onMounted, onDeactivated, reactive } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from '@headlessui/vue'
import BasicButton from '@componentes/ui/buttons/BasicButton.vue'
import InputText from '@componentes/ui/InputText.vue'
import type { NewGameRequest } from '../api/model/playerModel';
import { usePlayerStore } from '@/stores/modulos/player';
import { useToastStore } from '@/stores/modulos/toast';

const playerStore = usePlayerStore();

const frmData: NewGameRequest = reactive({
    width: 4,
    height: 4
})

const props = defineProps({
    modelValue: {
        type: [Boolean],
        required: true
    },
})

const emit = defineEmits(['update:modelValue', 'crear'])
const setIsOpen = (value: boolean) => {
    emit('update:modelValue', value)
};

const onClickCrearNuevaPartida = async () => {
    try {
        playerStore.playerSelected = 0
        const res = await playerStore.newGame(frmData)
        if(res){
            setIsOpen(false)
            emit('crear')
        }
    } catch (error) {
        useToastStore().error('Los valores no son correctos.')
        //En este caso si tenemos un error no quiero cerrar el dialog
    }
};

</script>

<template>
    <Dialog :open="props.modelValue" @close="setIsOpen(false)" class="fixed inset-0 z-30 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full py-8 px-1 md:p-8">
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
            <div class="relative w-full max-w-lg mx-auto bg-white rounded-xl">
                <div class="flex justify-center items-center h-16 border-b border-gray-200 px-3">
                    <h2 class="text-base leading-none tracking-tight font-extrabold">Crea una nueva partida</h2>
                    <button @click="setIsOpen(false)"
                        class="w-8 h-8 absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-none">
                        <span class="material-icons text-lg text-gray-500">close</span>
                    </button>
                </div>
                <div class="p-6">
                    <div class="text-center mb-4">
                        <p>Rellena los siguientes campos para empezar a jugar.</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <InputText label="Columnas" v-model="frmData.width" type="number"></InputText>
                        <InputText label="Filas" v-model="frmData.height" type="number"></InputText>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <BasicButton @click="setIsOpen(false)" text="Cancelar" block outlined></BasicButton>
                        <BasicButton @click="onClickCrearNuevaPartida" text="Crear partida" block></BasicButton>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>