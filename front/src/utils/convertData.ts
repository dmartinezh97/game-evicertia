import type { PositionPlayer } from '../api/model/playerModel';

/**
 * @description: Convertir numero de columna a letra
 * @returns:
 * @example:
 */
export function convertData(data: PositionPlayer[]): string {
    return data.map(item => {
        // Asumo que la columna 0 es 'A', 1 es 'B', etc.
        const columnLetter = String.fromCharCode(65 + item.column);

        return columnLetter + (item.row + 1);
    }).join('-');
}