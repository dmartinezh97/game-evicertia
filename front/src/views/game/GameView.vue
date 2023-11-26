<script setup lang="ts">
import { ref, computed, h } from 'vue';
import DialogChoosePlayer from '@componentes/DialogChoosePlayer.vue';
import BasicButton from '@componentes/ui/buttons/BasicButton.vue';
import InputText from '@/components/ui/InputText.vue';
import DialogCrearNuevoJuego from '@/components/DialogCrearNuevoJuego.vue';
import { usePlayerStore } from '@/stores/modulos/player';
import Tablero from '@/components/Tablero.vue';
import CardPlayer from '@/components/CardPlayer.vue';

const playerStore = usePlayerStore();

const showModalChoosePlayer = ref(false);
const showModalCrearJuego = ref(false);
const showModalPlayer = ref(false);

const partidasJugadas = ref(0)
let tablero = ref(undefined)

const onClickOpenModalChoosePlayer = () => {
  showModalChoosePlayer.value = true
}

const onClickOpenModalCrearJuego = () => {
  playerStore.isPlaying = false
  playerStore.playerSelected = 0
  partidasJugadas.value++
  //Podría resetear el juego cada vez que se inicia
  //Pero voy a dejar que se guarde el estado por si se "pierde" la sesión
  // playerStore.resetPlayerState()
  showModalCrearJuego.value = true
}

const getTextButton = computed(() => {
  return playerStore.isPlaying ? '¡Comenzar de nuevo!' : '¡Quiero jugar!'
})

</script>

<template>
  <div id="game" class="container mx-auto grid place-items-center">
    <div class="flex flex-col items-center">
      <BasicButton @click="onClickOpenModalCrearJuego" data-test="btnQuieroJugar" :text="getTextButton"></BasicButton>
      <div v-if="playerStore.getIsPlaying" class="flex mt-4">
        <Tablero :key="partidasJugadas" @show-card-player="showModalPlayer = true" class="overflow-auto md:max-w-3xl"></Tablero>
        <CardPlayer v-model="showModalPlayer" :key="partidasJugadas"></CardPlayer>
      </div>
    </div>
  
    <DialogCrearNuevoJuego v-model="showModalCrearJuego" @crear="onClickOpenModalChoosePlayer"></DialogCrearNuevoJuego>
    <DialogChoosePlayer v-model="showModalChoosePlayer"></DialogChoosePlayer>
  </div>
</template>