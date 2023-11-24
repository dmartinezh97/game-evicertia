import type { LocaleType } from "@/types/config";

export function setHtmlPageLang(locale: LocaleType) {
    document.querySelector('html')?.setAttribute('lang', locale);
  }