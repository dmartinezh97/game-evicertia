import { ToastProps } from '../components/Toasts/typing';
import { MisNegociosResultModel } from '../api/model/negocioModel';
import type { MisEventosResultModel } from '@/api/model/eventoModel';
import type { ErrorTypeEnum } from '@/enums/exceptionEnum';
import { RemovableRef } from '@vueuse/core';
import type { PositionPlayer } from '@/api/model/playerModel';

export interface FrmLogin {
    email: string;
    password: string;
}

export interface FrmSignup {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UserState {
    user: Nullable<UserInfo>;
    token: RemovableRef<string>;
    cookiesAceptadas: RemovableRef<boolean>;
    //roleList: RoleEnum[];
    // sessionTimeout?: boolean;
    // lastUpdateTime: number;
}

interface PlayerState {
    playerSelected: RemovableRef<number>;
    players: RemovableRef<PlayerInfo[]>;
    columnas: RemovableRef<number>;
    filas: RemovableRef<number>;
    isPlaying: RemovableRef<boolean>;
    tablero: RemovableRef<number[][]>; //| null[][]
    posicionActual: RemovableRef<PositionPlayer>;
}

export interface PlayerInfo {
    id: number;
    img: string;
    username: string;
    name: string;
    subname: string;
}

export interface ToastState {
    toasts: ToastProps[];
}

export interface AppState {
    pageLoading: boolean;
}

export interface NegocioState {
    negocios: MisNegociosResultModel[];
    negocio: Partial<NuevoNegocio>;
}

export interface NuevoNegocio{
    nombre: string;
    descripcion: string;
    tipo_negocio: number;
    logo: any;
    imgCabecera: any;
    direccion: DireccionNegocio;
}

export interface DireccionNegocio{
    calle: string;
    numero: string;
    localidad: string;
    cp: string;
    provincia: string;
    pais: string;
}

export interface EventoState {
    eventos: MisEventosResultModel[];
}

export interface UserInfo {
    IdUsuario: string;
    Nombre: string;
    Apellidos: string;
    Usuario: string;
    Telefono: string;
    Email: string;
    Rol: string;
    Token: string;
}