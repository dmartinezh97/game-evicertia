import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios"
import axios from 'axios';
import { useUserStore } from '../../../stores/modulos/user';
import { useToastStore } from '../../../stores/modulos/toast';
import { useAppStore } from "@/stores/modulos/app";

// interface VueConstructor {
//     $axios: AxiosInstance;
// }


export namespace Http {
    export class ApiJwtService {
        constructor() {
            this.request();
            this.response();
        }
        
        protected request() {
            axios.interceptors.request.use(
                (config: AxiosRequestConfig) => {
                    const appStore = useAppStore();
                    //appStore.setPageLoading(true);
                    const userStore = useUserStore();
                    const token = userStore.getToken;
                    //TODO: Filtrar por permiso de rutas si es Auth para enviar token
                    // config.headers.common["Authorization"] = "Bearer " + token;

                    return config;
                },
                (err: any) => {
                    return Promise.reject(err);
                }
            );
        }

        protected response() {
            axios.interceptors.response.use(
                (response: AxiosResponse) => {
                    const appStore = useAppStore();
                    //appStore.setPageLoading(false);
                    return response;
                },
                (error: any) => {
                    const toastStore = useToastStore();
                    // toastStore.error(error.message)
                    //TODO: Si da un 401, redireccionar a una página personalizada
                    // switch (error.response.status) {
                    //     case 400:
                    //         toastStore.error(error.response.data.error);
                    //         break;
                    //     default:
                    //         toastStore.warning(error.response.data.error);
                    //         break;
                    // }
                    return Promise.reject(error);
                }
            );
        }
    }
}