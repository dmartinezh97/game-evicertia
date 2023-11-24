<script setup lang="ts">
import { ref, onMounted, onDeactivated, reactive, computed, watch } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, DialogDescription, RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import BasicButton from './ui/buttons/BasicButton.vue'
import InputText from './ui/InputText.vue'
import type { LoginParams } from '@/api/model/userModel';
import { usePlayerStore } from '@/stores/modulos/player';
import { getEnv } from '@/utils/shared/envUtils';
import { useToastStore } from '@/stores/modulos/toast';


const playerStore = usePlayerStore();
const toastStore = useToastStore();


const selectedPlayer = ref(playerStore.playerSelected)

const props = defineProps<{
    modelValue: boolean
}>();

const emit = defineEmits(['update:modelValue'])
const setIsOpen = (value: boolean) => {
    emit('update:modelValue', value)
};

watch(selectedPlayer, (newValue) => {
    playerStore.updatePlayerSelected(newValue)
})

const onClickGuardarCambios = async () => {
    try {
        const objectPlayer = playerStore.getInfoPlayerSelected()
        if(objectPlayer !== undefined){
            const res = await playerStore.newPlayer({
                username: objectPlayer.username
            })
            if(res){
                toastStore.success('Jugador seleccionado correctamente')
                setIsOpen(false)
            }
        }else{
            //No debería entrar nunca por aquí
            toastStore.warning('No se ha encontrado al jugador.')
        }
    } catch (error) {
        //En este caso si tenemos un error no quiero cerrar el dialog
    }
};

</script>

<template>
    <Dialog :open="props.modelValue" @close="setIsOpen" class="fixed inset-0 z-30 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full py-8 px-1 md:p-8">
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
            <div class="relative w-full max-w-2xl mx-auto bg-white rounded-xl">
                <div class="flex justify-center items-center p-4">
                    <h2 class="text-2xl leading-none tracking-tight">Choose <span class="font-bold">your player</span></h2>
                    <button @click="setIsOpen(false)"
                        class="w-8 h-8 absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-none">
                        <span class="material-icons text-lg text-gray-500">close</span>
                    </button>
                </div>
                <div class="modal-body">
                    <RadioGroup v-model="selectedPlayer" as="div"
                        class="relative grid grid-cols-1 sm:grid-cols-3 p-4 gap-[10px]">
                        <RadioGroupOption id="listplayers" v-for="player in playerStore.getListPlayers" :key="player.id + player.name" v-slot="{ checked }" :value="player.id"
                            class="container-player border-[5px] border-solid border-transparent rounded-md overflow-hidden hover:cursor-pointer">
                            <span v-if="checked"
                                :class="checked ? 'absolute top-0 right-1 z-1 font-extrabold text-2xl text-[#7749F8]' : ''">P1</span>
                            <div class="card-image bg-[#434343]" :key="player.id + '_' + player.name">
                                <div :class="[checked ? 'opacity-100' : 'opacity-40', 'cardimage h-28 bg-contain bg-center bg-no-repeat']"
                                    :style="{ backgroundImage: 'url(' + player.img + ')' }"></div>
                                <div class="cardcontent flex justify-center text-white bg-[#343333] p-3">
                                    <div>{{ player.subname }} <span class="font-bold">{{ player.name }}</span></div>
                                </div>
                            </div>
                        </RadioGroupOption>
                    </RadioGroup>
                </div>
                <div class="modal-footer p-4">
                    <div class="modalFooterContainer flex justify-end">
                        <BasicButton @click="onClickGuardarCambios" data-test="btnIniciarSesion" text="Save changes" rounded :disabled="playerStore.getPlayerIsNotSelected"></BasicButton>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>


<style scoped>
.container-player[data-headlessui-state*="checked"] {
    border-color: #7749F8;
}
</style>