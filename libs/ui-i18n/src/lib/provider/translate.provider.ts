import {
  EnvironmentProviders,
  importProvidersFrom,
  makeEnvironmentProviders,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(prefix: string) {
  return (http: HttpClient) => new TranslateHttpLoader(http, prefix, '.json');
}

// Used only once in the root (Shell)
export function provideRootTranslate(
  prefix = '/assets/i18n/'
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader(prefix),
          deps: [HttpClient],
        },
      })
    ),
  ]);
}

// Used in each MFE (child modules)
export function provideChildTranslate(prefix: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forChild({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader(prefix),
          deps: [HttpClient],
        },
      })
    ),
  ]);
}
