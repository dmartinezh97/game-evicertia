<script setup lang="ts">

import { usePlayerStore } from '@/stores/modulos/player';
import CasillaImg from '@img/png/players/casilla.png'
import { reactive } from 'vue';

const playerStore = usePlayerStore();

const emit = defineEmits(['showCardPlayer'])

const onClickActualizarPosicionJugador = (columna: number, fila: number) => {
    if(playerStore.estoyEnLaPosicionActual(columna, fila)){
        emit('showCardPlayer', true)
    }else{
        playerStore.actualizrPosicionJugador(columna, fila)
    }
}

</script>

<template>
    <div id="tablero">
        <div class="bg-white p-5 rounded-md">
            <div class="grid grid-flow-col auto-cols-max gap-2">
                <div v-for="columna in playerStore.getColumnas" :key="playerStore.playerSelected + columna" :columna="columna" class="grid gap-2">
                    <div v-for="fila in playerStore.getFilas" :key="playerStore.playerSelected+columna+fila" :fila="fila"
                    @click="onClickActualizarPosicionJugador(columna-1, fila-1)"
                    :class="[playerStore.posicionOcupada(columna-1, fila-1) ? 'border-primary-500' : 'border-red-500']"
                    class="flex justify-center items-center w-28 h-28 border-[5px] border-solid bg-cover rounded-md"
                    :style="{backgroundImage: 'url(' + CasillaImg + ')'}">
                        <div v-if="playerStore.estoyEnLaPosicionActual(columna-1, fila-1)"
                        class="w-full h-full bg-cover bg-no-repeat bg-center"
                        :style="{backgroundImage: 'url(' + playerStore.getImagePlayerSelected() + ')'}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>