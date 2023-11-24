import type { LocaleSetting, LocaleType } from "@/types/config";

export const LOCALE: { [key: string]: LocaleType } = {
  ES_ES: 'es_ES',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  // Lenguaje actual
  locale: LOCALE.ES_ES,
  // Lenguaje por defecto language
  fallback: LOCALE.ES_ES,
  // Lenguajes disponibles
  availableLocales: [LOCALE.ES_ES, LOCALE.EN_US],
};

//Listado de idiomas disponibles
// export const localeList: DropMenu[] = [
//   {
//     text: 'Español',
//     event: LOCALE.ES_ES,
//   },
//   {
//     text: 'English',
//     event: LOCALE.EN_US,
//   },
// ];
