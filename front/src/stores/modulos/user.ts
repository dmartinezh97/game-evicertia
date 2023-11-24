import { TOKEN_KEY, USER_INFO_KEY, COOKIES_KEY } from '@/enums/cacheEnum';
import type { UserState } from '@/types/store'
import { defineStore } from 'pinia'
import type { UserInfo } from '../../types/store';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { loginApi, infoUserApi, updateInfoUserApi, signUpApi } from '../../api/user';
import type { LoginParams, SignupParams, UserInfoModel } from '../../api/model/userModel';
import { router } from '../../router/index';
import { PageEnum } from '@/enums/pageEnum';


export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        user: useStorage<UserInfo>(USER_INFO_KEY, null, undefined, { serializer: StorageSerializers.object }),
        token: useStorage<string>(TOKEN_KEY, ""),
        cookiesAceptadas: useStorage<boolean>(COOKIES_KEY, false),
    }),
    getters: {
        getIsLogged(): boolean {
            return this.user != null;
        },
        getUserInfo(): UserInfo {
            return this.user || {};
        },
        getFullName(): string {
            if(this.user){
                return this.user.Nombre + " " + this.user.Apellidos;
            }else return "-"
        },
        getEmail(): string {
            if(this.user){
                return this.user.Email;
            }else return "-"
        },
        getToken(): string {
            return this.token || "";
        },
        getIsCookiesAcepted(): boolean {
            return this.cookiesAceptadas;
        },
    },
    actions: {
        resetState() {
            this.user = null;
            this.token = "";
            this.cookiesAceptadas = false;
            router.push({
                name: PageEnum.INICIO
            });
        },
        setUserInfo(info: UserInfo | null) {
            this.user = info;
        },
        setToken(info: string | undefined) {
            this.token = info ? info : ''; // for null or undefined value
        },
        setCookies(value: boolean) {
            this.cookiesAceptadas = value
        },
        /**
         * @description: Iniciar sesión
         */
        async login(param: LoginParams): Promise<boolean> {
            try {
                const result = await loginApi(param)
                const { data } = result
                this.setUserInfo(data)
                this.setToken(data.Token)
                router.push({
                    name: PageEnum.INICIO
                })
                return true
            } catch (error) {
                return Promise.reject(error)
            }
        },
        /**
         * @description: Iniciar sesión
         */
        async signUp(param: SignupParams): Promise<boolean> {
            try {
                const result = await signUpApi(param)
                return true
            } catch (error) {
                return Promise.reject(error)
            }
        },
        /**
         * @description: Recibe la Información del usuario
         */
        async infoUser(): Promise<UserInfoModel> {
            try {
                const result = await infoUserApi()
                const { data } = result
                return data;
            } catch (error) {
                return Promise.reject(error)
            }
        },
        /**
         * @description: Actualiza la Información usuario
         */
        async updateInfoUser(params: UserInfoModel): Promise<boolean> {
            try {
                await updateInfoUserApi(params)
                return true;
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
})
