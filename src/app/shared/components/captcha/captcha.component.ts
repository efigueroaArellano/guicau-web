import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

declare global {
    interface Window {
        grecaptcha: any;
        grecaptchaCallback: () => void;
    }
}

/**
 * @ngdoc component
 * @name app.components:CaptchaComponent
 * @description
 * El componente `CaptchaComponent` integra Google reCAPTCHA v2 en tu aplicación Angular.
 * Muestra un captcha que los usuarios deben completar para verificar su autenticidad. 
 * Este componente emite eventos cuando el captcha es completado o ha expirado.
 *
 * @example
 * <pre>
 * <app-captcha [siteKey]="yourSiteKey" (onResponse)="handleResponse($event)" (onExpired)="handleExpired()"></app-captcha>
 * </pre>
 */
@Component({
    standalone: true,
    selector: 'app-captcha',
    template: `<div #recaptcha></div>`,
    styles: [],
})
export class CaptchaComponent implements OnInit {
    /**
     * @ngdoc property
     * @name recaptchaElement
     * @propertyOf app.components:CaptchaComponent
     * @description
     * Referencia al elemento del DOM donde se renderiza el reCAPTCHA.
     * 
     * @type {ElementRef}
     */
    @ViewChild('recaptcha', { static: true }) recaptchaElement!: ElementRef;

    /**
     * @ngdoc input
     * @name siteKey
     * @propertyOf app.components:CaptchaComponent
     * @description
     * La clave pública del sitio (siteKey) proporcionada por Google para inicializar el reCAPTCHA.
     * 
     * @type {string}
     */
    @Input() siteKey!: string;

    /**
     * @ngdoc output
     * @name onResponse
     * @eventOf app.components:CaptchaComponent
     * @description
     * Evento emitido cuando el usuario completa con éxito el reCAPTCHA. El evento emite un string con el token de validación.
     * 
     * @type {EventEmitter<string>}
     */
    @Output() onResponse = new EventEmitter<string>();

    /**
     * @ngdoc output
     * @name onExpired
     * @eventOf app.components:CaptchaComponent
     * @description
     * Evento emitido cuando el reCAPTCHA ha expirado. El evento emite un valor booleano (`true`).
     * 
     * @type {EventEmitter<boolean>}
     */
    @Output() onExpired = new EventEmitter<boolean>();

    constructor() {}

    /**
     * @ngdoc method
     * @name ngOnInit
     * @methodOf app.components:CaptchaComponent
     * @description
     * Método del ciclo de vida del componente que se ejecuta al inicializarse. Este método carga el script necesario
     * para Google reCAPTCHA y llama a la función `addRecaptchaScript` para integrarlo en el DOM.
     */
    ngOnInit(): void {
        this.addRecaptchaScript();
    }

    /**
     * @ngdoc method
     * @name renderReCaptcha
     * @methodOf app.components:CaptchaComponent
     * @description
     * Método que renderiza el widget reCAPTCHA en el elemento HTML referenciado. Este método también define las
     * callbacks para manejar la expiración del captcha y la respuesta emitida cuando el usuario lo completa.
     */
    renderReCaptcha(): void {
        window.grecaptcha.render(this.recaptchaElement.nativeElement, {
            sitekey: this.siteKey,
            'expired-callback': () => {
                this.onExpired.emit(true);
            },
            callback: (response: string) => {
                this.onResponse.emit('finalizarExamen');
            },
        });
    }

    /**
     * @ngdoc method
     * @name addRecaptchaScript
     * @methodOf app.components:CaptchaComponent
     * @description
     * Método que carga dinámicamente el script de Google reCAPTCHA en el DOM y maneja su inicialización. Si el script
     * ya está cargado, se llama directamente a la función `renderReCaptcha`. Si no, se carga y espera a que esté listo para renderizar el captcha.
     */
    addRecaptchaScript(): void {
        let _captchaTries = 0;
        window.grecaptchaCallback = () => {
            _captchaTries++;
            if (_captchaTries > 9) return;
            if (
                window.grecaptcha &&
                typeof window.grecaptcha.render === 'function'
            ) {
                this.renderReCaptcha();
                return;
            }
            setTimeout(() => {
                this.renderReCaptcha();
            }, 1000);
        };

        const d = document,
            s = 'script',
            id = 'recaptcha-jssdk';
        let js: HTMLScriptElement;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            this.renderReCaptcha();
            return;
        }
        js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src =
            'https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit&hl=es';
        fjs.parentNode?.insertBefore(js, fjs);
    }
}
