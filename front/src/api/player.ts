import type { AddPlayerRequest, AddPlayerResponse, InfoPlayerResponse, MovPlayerRequest, MovPlayerResponse, NewGameRequest, NewGameResponse } from "./model/playerModel";
import axios from 'axios';

enum Api {
    NewGame = '/game',
    NewPlayer = '/player',
    MovPlayer = '/player',
    InfoPlayer = '/player',
}

/**
 * @description: Nuevo juego API
 */
export function newGame(params: NewGameRequest) {
    params.width = parseInt(params.width.toString())
    params.height = parseInt(params.height.toString())
    return axios.post<NewGameResponse>(Api.NewGame, params);
}

/**
 * @description: Nuevo jugador API
 */
export function newPlayer(params: AddPlayerRequest) {
    return axios.post<AddPlayerResponse>(Api.NewPlayer, params);
}

/**
 * @description: Actualizar posición jugador en el tablero API
 */
export function updatePosicion(params: MovPlayerRequest) {
    const url = Api.MovPlayer + `/${params.username}`
    return axios.patch<MovPlayerResponse>(url, params.data);
}

/**
 * @description: Recibir información completa jugador API
 */
export function infoPlayer(params: AddPlayerRequest) {
    let url = Api.InfoPlayer + "?username=" + params.username
    return axios.get<InfoPlayerResponse>(url);
}