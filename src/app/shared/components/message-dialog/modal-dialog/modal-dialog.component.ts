import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TIPO_MODAL } from '../enum/tipo-modal.enum';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

/**
 * @ngdoc component
 * @name app.components:ModalDialogComponent
 * @description
 * Componente de diálogo modal reutilizable que permite mostrar diferentes tipos de mensajes con opciones
 * de botones como aceptar, cancelar, o continuar. Utiliza PrimeNG y tiene diferentes configuraciones 
 * basadas en los tipos de diálogos definidos.
 *
 * @example
 * <app-modal-dialog [isVisible]="true" [titulo]="'Confirmación'" [mensaje]="'¿Estás seguro?'"></app-modal-dialog>
 */
@Component({
    standalone: true,
    selector: 'app-modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.scss'],
    imports: [CommonModule, DialogModule, AvatarModule]
})
export class ModalDialogComponent {

    private _mensaje!: string;

    /**
     * @ngdoc input
     * @name isVisible
     * @propertyOf app.components:ModalDialogComponent
     * @description
     * Controla la visibilidad del diálogo. Si es `true`, el diálogo será visible.
     * 
     * @type {boolean}
     */
    @Input() isVisible: boolean = false;

    /**
     * @ngdoc input
     * @name titulo
     * @propertyOf app.components:ModalDialogComponent
     * @description
     * Título del diálogo, que se muestra en la parte superior.
     * 
     * @type {string}
     */
    @Input() titulo: string = '';

    /**
     * @ngdoc input
     * @name isAceptar
     * @propertyOf app.components:ModalDialogComponent
     * @description
     * Determina si se muestra el botón "Aceptar" en el diálogo.
     * 
     * @type {boolean}
     */
    @Input() isAceptar: boolean = false;

    /**
     * @ngdoc input
     * @name isCancelar
     * @propertyOf app.components:ModalDialogComponent
     * @description
     * Determina si se muestra el botón "Cancelar" en el diálogo.
     * 
     * @type {boolean}
     */
    @Input() isCancelar: boolean = false;

    /**
     * @ngdoc input
     * @name isContinuar
     * @propertyOf app.components:ModalDialogComponent
     * @description
     * Determina si se muestra el botón "Continuar" en el diálogo.
     * 
     * @type {boolean}
     */
    @Input() isContinuar: boolean = false;

    /**
     * @ngdoc input
     * @name tipoModal
     * @propertyOf app.components:ModalDialogComponent
     * @description
     * Define el tipo de modal que se va a mostrar (por ejemplo, `DANGER`, `SUCCESS`, `INFO`).
     * 
     * @type {TIPO_MODAL}
     */
    @Input() tipoModal!: TIPO_MODAL;

    /**
     * @ngdoc input
     * @name tipoBotones
     * @propertyOf app.components:ModalDialogComponent
     * @description
     * Define el tipo de botones que se van a mostrar en el diálogo, como 'confirmacion', 'confirmacionEliminar', etc.
     * 
     * @type {string}
     */
    @Input() tipoBotones: 'confirmacion' | 'confirmacionEliminar' | 'confirmacionSalir' | 'confirmacionAprobar' | 'confirmacionRechazar' = 'confirmacion';

    /**
     * @ngdoc output
     * @name cancelarEvent
     * @eventOf app.components:ModalDialogComponent
     * @description
     * Evento que se emite cuando el usuario hace clic en el botón "Cancelar".
     */
    @Output() cancelarEvent = new EventEmitter<void>();

    /**
     * @ngdoc output
     * @name aceptarEvent
     * @eventOf app.components:ModalDialogComponent
     * @description
     * Evento que se emite cuando el usuario hace clic en el botón "Aceptar".
     */
    @Output() aceptarEvent = new EventEmitter<void>();

    /**
     * @ngdoc output
     * @name continuarEvent
     * @eventOf app.components:ModalDialogComponent
     * @description
     * Evento que se emite cuando el usuario hace clic en el botón "Continuar".
     */
    @Output() continuarEvent = new EventEmitter<void>();

    constructor(private sanitizer: DomSanitizer) { }

    /**
     * @ngdoc input
     * @name mensaje
     * @methodOf app.components:ModalDialogComponent
     * @description
     * Establece el mensaje que se va a mostrar en el diálogo.
     * 
     * @param {string} value El mensaje que se va a mostrar.
     */
    @Input()
    set mensaje(value: string) {
        this._mensaje = value;
    }

    /**
     * @ngdoc method
     * @name mensajeHtml
     * @methodOf app.components:ModalDialogComponent
     * @description
     * Convierte el mensaje en HTML seguro para mostrarlo en el diálogo.
     * 
     * @returns {SafeHtml} El mensaje en formato HTML seguro.
     */
    get mensajeHtml(): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(this._mensaje);
    }

    /**
     * @ngdoc method
     * @name tipoModalEnum
     * @methodOf app.components:ModalDialogComponent
     * @description
     * Obtiene el tipo de modal del enum `TIPO_MODAL`.
     * 
     * @returns {TIPO_MODAL} El tipo de modal definido en la enumeración.
     */
    get tipoModalEnum(): any {
        return TIPO_MODAL;
    }

    /**
     * @ngdoc method
     * @name dialogStyleClass
     * @methodOf app.components:ModalDialogComponent
     * @description
     * Devuelve la clase CSS correspondiente al tipo de modal que se está mostrando.
     * 
     * @returns {string} La clase CSS a aplicar en el diálogo.
     */
    get dialogStyleClass(): string {
        switch (this.tipoModal) {
            case TIPO_MODAL.DANGER:
                return 'p-dialog-error';
            case TIPO_MODAL.SUCCESS:
                return 'p-dialog-success';
            case TIPO_MODAL.INFO:
                return 'p-dialog-alert';
            default:
                return '';
        }
    }

    /**
     * @ngdoc method
     * @name botonTexto
     * @methodOf app.components:ModalDialogComponent
     * @description
     * Devuelve el texto que debe mostrarse en el botón principal según el tipo de botones configurado.
     * 
     * @returns {string} El texto del botón.
     */
    get botonTexto(): string {
        switch (this.tipoBotones) {
            case 'confirmacionEliminar':
                return 'Eliminar';
            case 'confirmacionAprobar':
                return 'Si, aprobar';
            case 'confirmacionRechazar':
                return 'Si, rechazar';
            case 'confirmacionSalir':
                return 'Salir';
            default:
                return 'Aceptar';
        }
    }

    /**
     * @ngdoc method
     * @name cancelar
     * @methodOf app.components:ModalDialogComponent
     * @description
     * Cierra el diálogo y emite el evento de cancelación.
     */
    public cancelar() {
        this.isVisible = false;
        this.cancelarEvent.emit();
    }

    /**
     * @ngdoc method
     * @name aceptar
     * @methodOf app.components:ModalDialogComponent
     * @description
     * Cierra el diálogo y emite el evento de aceptación.
     */
    public aceptar() {
        this.isVisible = false;
        this.aceptarEvent.emit();
    }

    /**
     * @ngdoc method
     * @name continuar
     * @methodOf app.components:ModalDialogComponent
     * @description
     * Cierra el diálogo y emite el evento de continuar.
     */
    public continuar() {
        this.isVisible = false;
        this.continuarEvent.emit();
    }

    onSalir() {
        window.location.href = '/';
    }
}
