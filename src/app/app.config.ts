import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AutenticacionInterceptor } from './shared/interceptors/autenticacion.interceptor';



export function createTranslateLoader(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, 'i18n/', '.json');
  }

export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
        // { provide: HTTP_INTERCEPTORS, useClass: AutenticacionInterceptor, multi: true },
        provideHttpClient(),
        importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
        importProvidersFrom(
            TranslateModule.forRoot({
              loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
              },
              defaultLanguage: 'es',
            })
          ), provideAnimationsAsync(),
    ],
};
