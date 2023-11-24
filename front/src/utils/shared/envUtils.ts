/**
 * @description: Get variables de entorno
 * @returns:
 * @example:
 */
export function getEnv(): ImportMetaEnv {
    return import.meta.env;
}

/**
 * @description: ¿Estoy en modo desarrollo?
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
    return import.meta.env.DEV;
}