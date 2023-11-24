export interface ProjectConfig {
    // Lugar donde se guarda la información
    permissionCacheType: CacheTypeEnum;
    // Plugin para la detección de errores
    useErrorHandle: Boolean;
}

export type LocaleType = 'es_ES' | 'en';

export interface LocaleSetting {
    // Lenguaje actual
    locale: LocaleType;
    // Lenguaje por defecto language
    fallback: LocaleType;
    // Lenguajes disponibles
    availableLocales: LocaleType[];
  }