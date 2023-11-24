/**
 * @description: Parametros para iniciar un nuevo juego
 */
export interface NewGameRequest {
    width: number;
    height: number;
}

/**
 * @description: Los valores de retorno cuando se inicia el nuevo juego
 */
export interface NewGameResponse {
    message: string;
}

/**
 * @description: Parametros para añadir un nuevo jugador
 */
export interface AddPlayerRequest {
    username: string;
}

/**
 * @description: Parametros para mover un nuevo jugador
 */
export interface MovPlayerRequest {
    username: string;
    data: Array<OperationPlayer>;
}

interface OperationPlayer{
    "operationType": number,
    "path": string,
    "op": string,
    "from": string,
    "value": ValueOperationPlayer
}

interface ValueOperationPlayer{
    Row: number;
    Column: number;
}

/**
 * @description: Los valores de retorno cuando se añade el nuevo jugador
 */
export interface AddPlayerResponse {
    position: PositionPlayer;
}

/**
 * @description: Los valores de retorno cuando se añade el nuevo jugador
 */
export interface MovPlayerResponse {
    position: PositionPlayer;
}

export interface PositionPlayer {
    row: number;
    column: number;
}

/**
 * @description: Información del jugador
 */
export interface InfoPlayerResponse {
    player: Player;
}

interface Player {
    positions: PositionPlayer[];
    position: PositionPlayer;
    username: string;
}