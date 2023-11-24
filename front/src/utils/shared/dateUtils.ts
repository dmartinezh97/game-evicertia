export function formatDateTime(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = (fecha.getDate()).toString().padStart(2, '0');
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();

    return `${año}-${mes}-${dia}T${hora}:${minutos}`;
}