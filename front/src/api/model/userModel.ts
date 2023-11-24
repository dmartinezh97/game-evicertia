/**
 * @description: Parametros para iniciar sesión
 */
export interface LoginParams {
    email: string;
    password: string;
}

/**
 * @description: Parametros para crear cuenta
 */
export interface SignupParams {
    name: string;
    email: string;
    password: string;
}

/**
 * @description: Los valores de retorno cuando inicia sesión
 */
export interface LoginResultModel {
    IdUsuario: string;
    Nombre: string;
    Apellidos: string;
    Usuario: string;
    Telefono: string;
    Email: string;
    Rol: string;
    Token: string;
}

/**
 * @description: Información básica del usuario
 */
export interface UserInfoModel {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    fecha_nacimiento: string;
}