import { computed } from '@angular/core';
import {
  signalStore,
  withComputed,
  withState,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { setCookie, getCookie } from '../utils/cookie.utils';

export interface I18nState {
  lang: string;
}

const initialLang = getCookie('lang') || 'en';

export const I18nStore = signalStore(
  { providedIn: 'root' },
  withState<I18nState>({ lang: initialLang }),

  withComputed(({ lang }) => ({
    isArabic: computed(() => lang() === 'ar'),
  })),

  withMethods((store) => ({
    setLang(newLang: string) {
      patchState(store, { lang: newLang });
      setCookie('lang', newLang);
    },
  }))
);
