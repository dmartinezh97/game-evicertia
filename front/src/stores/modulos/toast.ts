import type { ToastState } from '@/types/store'
import { defineStore } from 'pinia'
import { ToastTypeEnum } from '../../enums/toastEnum';


export const useToastStore = defineStore({
    id: 'toast',
    state: (): ToastState => ({
        toasts: []
    }),
    actions: {
        info(msg: string) {
            this.toasts.push({msg, type: ToastTypeEnum.INFO })
        },
        success(msg: string) {
            this.toasts.push({ msg, type: ToastTypeEnum.SUCCESS })
        },
        warning(msg: string) {
            this.toasts.push({ msg, type: ToastTypeEnum.WARNING })
        },
        error(msg: string) {
            this.toasts.push({ msg, type: ToastTypeEnum.ERROR })
        },
        clearToast(msg: string) {
            let index = this.toasts.findIndex((t) => t.msg === msg);
            this.toasts.splice(index, 1);
        },
    }
})
