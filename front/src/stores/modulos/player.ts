import { TOKEN_KEY, USER_INFO_KEY, COOKIES_KEY, PLAYER_SELECTED_KEY, PLAYERS_LIST_KEY, COLUMNAS_TABLERO_KEY, FILAS_TABLERO_KEY, PLAYER_IS_PLAYING_KEY, TABLERO_KEY, POSICION_ACTUAL_KEY } from '@/enums/cacheEnum';
import type { PlayerInfo, PlayerState, UserState } from '@/types/store'
import { defineStore } from 'pinia'
import type { UserInfo } from '../../types/store';
import { StorageSerializers, useStorage } from '@vueuse/core';
import axios from 'axios';
import { router } from '../../router/index';
import { reactive, ref, toRefs, inject } from 'vue';
import { PageEnum } from '@/enums/pageEnum';
import { listPlayers } from '@/data/listPlayers';
import { infoPlayer, newGame, newPlayer, updatePosicion } from '@/api/player';
import type { NewGameRequest, AddPlayerRequest, MovPlayerRequest, PositionPlayer, InfoPlayerResponse } from '../../api/model/playerModel';
import { useToastStore } from '@/stores/modulos/toast';

export const usePlayerStore = defineStore({
    id: 'player',
    state: (): PlayerState => ({
        playerSelected: useStorage<number>(PLAYER_SELECTED_KEY, 0),
        players: useStorage<PlayerInfo[]>(PLAYERS_LIST_KEY, listPlayers, undefined, { serializer: StorageSerializers.object }),
        columnas: useStorage<number>(COLUMNAS_TABLERO_KEY, 0),
        filas: useStorage<number>(FILAS_TABLERO_KEY, 0),
        isPlaying: useStorage<boolean>(PLAYER_IS_PLAYING_KEY, false),
        tablero: useStorage<number[][]>(TABLERO_KEY, []),
        posicionActual: useStorage<PositionPlayer>(POSICION_ACTUAL_KEY, null, undefined, { serializer: StorageSerializers.object })
    }),
    getters: {
        getPlayerIsNotSelected(): boolean {
            return this.playerSelected === 0 || !this.getListPlayers.find(player => player.id === this.playerSelected);
        },
        getListPlayers(): PlayerInfo[] {
            return this.players;
        },
        getUltimaPosicion(): PositionPlayer {
            return this.posicionActual;
        },
        getColumnas(): number {
            return this.columnas
        },
        getFilas(): number {
            return this.filas
        },
        getIsPlaying(): boolean {
            return this.isPlaying
        },
        getTablero(): number[][] {
            return this.tablero
        },
    },
    actions: {
        resetPlayerState() {
            this.playerSelected = 0;
            this.columnas = 0;
            this.filas = 0;
            this.isPlaying = false;
            this.tablero = []
        },
        updatePlayerSelected(player_id: number){
            this.playerSelected = player_id;
        },
        updatePositionTablero(columna: number, fila: number){
            this.posicionActual = {
                column: columna,
                row: fila
            }
            this.tablero[columna][fila] = 1;
        },
        estoyEnLaPosicionActual(columna: number, fila: number){
            const ultimaPos = this.getUltimaPosicion
            return ultimaPos.column == columna && ultimaPos.row == fila
        },
        posicionOcupada(columna: number, fila: number){
            if (fila < 0 || fila >= this.filas || columna < 0 || columna >= this.columnas) {
                return false; // Posición fuera del tablero
            }
            return this.tablero[columna][fila] === 1;
        },
        getInfoPlayerSelected(){
            return this.players.find(x => x.id == this.playerSelected)
        },
        getImagePlayerSelected(){
            return this.players.find(x => x.id == this.playerSelected)?.img
        },
        crearTablero(){
            let tblro = []
            for (let i = 0; i < this.filas; i++) {
                let row = [];
        
                for (let x = 0; x < this.columnas; x++) {
                    row.push(0);
                }
        
                tblro.push(row);
            }
            return tblro;
        },
        /**
         * @description: Actualiza la posición del jugador en el tablero
         */
        async actualizrPosicionJugador(columna: number, fila: number) {
            //Comprobar primero si ya he pasado por esa posición del tablero
            const infoPlayer = this.getInfoPlayerSelected()
            if(infoPlayer){
                try {
                    let param: MovPlayerRequest = {
                        username: infoPlayer?.username,
                        data: [
                            {
                                operationType: 0,
                                path: "/Position",
                                op: "replace",
                                from: "string",
                                value: {
                                    "Column": columna,
                                    "Row": fila
                                }
        
                            }
                        ]
                    }
                    const result = await updatePosicion(param)
                    const { data } = result
                    this.updatePositionTablero(data.position.column, data.position.row)
                } catch (error) {
                    useToastStore().warning("No se ha podido hacer el movimiento")
                }
            }
        },
        /**
         * @description: Nuevo juego
         */
        async newGame(param: NewGameRequest): Promise<boolean> {
            try {
                const result = await newGame(param)
                const { data } = result
                this.columnas = param.width
                this.filas = param.height
                this.tablero = this.crearTablero()

                useToastStore().info(data.message)
                return true
            } catch (error) {
                return Promise.reject(error)
            }
        },
        /**
         * @description: Nuevo juego
         */
        async newPlayer(param: AddPlayerRequest): Promise<boolean> {
            try {
                const result = await newPlayer(param)
                const { data } = result
                this.updatePositionTablero(data.position.column, data.position.row)
                this.isPlaying = true
                return true
            } catch (error) {
                return Promise.reject(error)
            }
        },
        /**
         * @description: Nuevo juego
         */
        async getMovimientosPlayer(param: AddPlayerRequest): Promise<PositionPlayer[]> {
            try {
                const result = await infoPlayer(param)
                const { data } = result

                return data.player.positions
            } catch (error) {
                return Promise.reject(error)
            }
        },
    }
})
