import { LOCALE_KEY } from '@/enums/cacheEnum';
import { localeSetting } from '@/settings/localeSettings';
import type { LocaleSetting, LocaleType } from '@/types/config';
import type { AppState } from '@/types/store'
import { defineStore } from 'pinia'
import { store } from '..';

/* TODO: Para cuando esté listo el módulo de localStorage y sessionStorage */
//const ls = createLocalStorage();
//const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;
const lsLocaleSetting = localeSetting as LocaleSetting;

interface LocaleState {
    localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
    id: 'locale',
    state: (): LocaleState => ({
        localInfo: lsLocaleSetting,
    }),
    getters: {
        getLocale(): LocaleType {
            return this.localInfo?.locale ?? 'es_ES';
        },
    },
    actions: {
        /**
         * @description: Configurar la información multilingüe y el caché
         */
        setLocaleInfo(info: Partial<LocaleSetting>) {
          this.localInfo = { ...this.localInfo, ...info };
          //ls.set(LOCALE_KEY, this.localInfo); /* TODO: Setear el idioma seleccionado */
        },
        /**
         * @description: Inicializar la información multilingüe y cargar la configuración existente desde la caché local
         */
        initLocale() {
          this.setLocaleInfo({
            ...localeSetting,
            ...this.localInfo,
          });
        },
      },
})

export function useLocaleStoreWithOut() {
    return useLocaleStore(store);
}
