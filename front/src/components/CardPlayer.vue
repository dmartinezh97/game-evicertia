<script setup lang="ts">
import { Dialog, DialogOverlay } from '@headlessui/vue'
import { usePlayerStore } from '@/stores/modulos/player';
import { watch, reactive, ref } from 'vue';
import type { InfoPlayerResponse, PositionPlayer } from '../api/model/playerModel';
import { convertData } from '../utils/convertData';

const playerStore = usePlayerStore();

const props = defineProps<{
    modelValue: boolean
}>();

let movimientosConvertidos = ref('');

const emit = defineEmits(['update:modelValue', 'registro'])
const setIsOpen = (value: boolean) => {
    emit('update:modelValue', value)
};

// Observa los cambios en modelValue
watch(() => props.modelValue, async (newValue) => {
    if (newValue) {
        // El dialogo se ha abierto
        console.log('Dialogo abierto');
        // Realiza la petición necesaria aquí
        const object = playerStore.getInfoPlayerSelected()
        if(object){
            const nuevosMovimientos = await playerStore.getMovimientosPlayer({
                username: object.username
            })

            movimientosConvertidos.value = convertData(nuevosMovimientos)

            // Limpia el arreglo existente
            // movimientos.splice(0, movimientos.length);

            // Agrega los nuevos elementos
            // nuevosMovimientos.forEach(mov => movimientos.push(mov));
            // console.log(objPlayer.player.positions)
            // movimientos = objPlayer.player.positions
        }
    } else {
        // El dialogo se ha cerrado
        console.log('Dialogo cerrado');
        // Realiza otra petición si es necesario
    }
});

</script>

<template>
    <Dialog :open="props.modelValue" @close="setIsOpen" class="fixed inset-0 z-30 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full py-8 px-1 md:p-8">
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
            <div class="relative w-full max-w-sm mx-auto bg-red-500 rounded-xl overflow-hidden">
                <button @click="setIsOpen(false)"
                    class="w-8 h-8 absolute right-1 top-1 z-1 hover:bg-black/10 rounded-full focus:outline-none focus:ring-none">
                    <span class="material-icons text-lg text-white">close</span>
                </button>
                <div class="card-image bg-[#434343]">
                    <div class="cardimage h-48 bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(' + playerStore.getImagePlayerSelected() + ')' }"></div>
                    <div class="cardcontent flex flex-col leading-8 justify-start text-white bg-[#343333] px-7 py-4">
                        <div>{{ playerStore.getInfoPlayerSelected()?.subname }} <span class="font-bold">{{ playerStore.getInfoPlayerSelected()?.name }}</span></div>
                        <div class="break-words">Movimientos: <span class="break-words">{{ movimientosConvertidos }}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>