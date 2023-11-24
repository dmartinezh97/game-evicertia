import { useAppStore } from "@/stores/modulos/app";
import { useLocaleStore } from "@/stores/modulos/locale";

export function initAppConfigStore(){
    const localeStorage = useLocaleStore()
    const appStore = useAppStore()


    //Inicializar el localeStorage
    localeStorage.initLocale()

}