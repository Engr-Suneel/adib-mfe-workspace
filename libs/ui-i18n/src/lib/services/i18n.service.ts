import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nStore } from '../store/translation.store';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly translate = inject(TranslateService);
  private readonly i18nStore = inject(I18nStore);

  constructor() {
    const savedLang = this.i18nStore.lang(); // Signal value
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.translate.use(savedLang);
    this.setDirection(savedLang);
  }

  changeLang(lang: string) {
    this.i18nStore.setLang(lang);
    this.translate.use(lang);
    this.setDirection(lang);
  }

  private setDirection(lang: string) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  get languages() {
    return [
      { code: 'en', label: 'English' },
      { code: 'ar', label: 'العربية' },
    ];
  }

  get currentLang() {
    return this.i18nStore.lang(); // signal
  }

  get isArabic() {
    return this.i18nStore.isArabic(); // signal
  }
}
