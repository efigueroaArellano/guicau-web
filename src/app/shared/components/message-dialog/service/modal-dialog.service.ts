import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { TIPO_MODAL } from '../enum/tipo-modal.enum';

/**
 * @ngdoc interface
 * @name ModalDialogConfig
 * @description
 * Interfaz que define las opciones de configuración para el diálogo modal.
 */
interface ModalDialogConfig {
    titulo: string;
    mensaje: string;
    aceptar?: boolean;
    cancelar?: boolean;
    continuar?: boolean;
    tipoModal: TIPO_MODAL;
    visible?: boolean;
    tipoBotones?: 'confirmacion' | 'confirmacionEliminar' | 'confirmacionSalir' | 'confirmacionAprobar' | 'confirmacionRechazar';
}

/**
 * @ngdoc service
 * @name app.services:ModalDialogService
 * @description
 * Servicio que gestiona la apertura y cierre de diálogos modales en la aplicación. Utiliza el componente `ModalDialogComponent`
 * para mostrar diferentes tipos de diálogos configurables.
 */
@Injectable({
    providedIn: 'root'
  })
export class ModalDialogService {
    /**
     * @ngdoc property
     * @name dialogComponentRef
     * @propertyOf app.services:ModalDialogService
     * @description
     * Referencia al componente `ModalDialogComponent` que se utiliza para controlar la instancia del diálogo.
     * Se asegura de que solo haya una instancia activa del diálogo en un momento dado.
     * 
     * @type {ComponentRef<ModalDialogComponent> | null}
     */
    private dialogComponentRef: ComponentRef<ModalDialogComponent> | null = null;

    constructor(
        private resolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    /**
     * @ngdoc method
     * @name openDialog
     * @methodOf app.services:ModalDialogService
     * @description
     * Abre un nuevo diálogo modal basado en las opciones de configuración proporcionadas. Si ya existe un diálogo abierto, se cierra antes de abrir uno nuevo.
     * 
     * @param {ModalDialogConfig} config Configuración del diálogo que contiene el título, mensaje, visibilidad y tipo de botones, entre otros.
     * @returns {ModalDialogComponent} Retorna la instancia del componente `ModalDialogComponent` recién creado.
     *
     * @example
     * <pre>
     * const config: ModalDialogConfig = {
     *    titulo: 'Confirmación',
     *    mensaje: '¿Estás seguro de continuar?',
     *    aceptar: true,
     *    cancelar: true,
     *    tipoModal: TIPO_MODAL.SUCCESS
     * };
     * this.modalDialogService.openDialog(config);
     * </pre>
     */
    openDialog(config: ModalDialogConfig): ModalDialogComponent {
        if (this.dialogComponentRef) {
            // Si ya hay un diálogo abierto, lo cerramos antes de abrir uno nuevo.
            this.closeDialog();
        }

        // Crear el componente de diálogo utilizando el ComponentFactoryResolver.
        const dialogComponentFactory = this.resolver.resolveComponentFactory(ModalDialogComponent);
        this.dialogComponentRef = dialogComponentFactory.create(this.injector);

        // Configurar la instancia del diálogo con los valores pasados en config.
        const instance = this.dialogComponentRef.instance;
        instance.mensaje = config.mensaje;
        instance.titulo = config.titulo;
        instance.isVisible = config.visible ?? true;
        instance.isAceptar = config.aceptar ?? false;
        instance.isCancelar = config.cancelar ?? false;
        instance.isContinuar = config.continuar ?? false;
        instance.tipoModal = config.tipoModal;
        instance.tipoBotones = config.tipoBotones ?? 'confirmacion'; // Solo para customización de leyendas de botones

        // Adjuntar el diálogo al DOM.
        this.appRef.attachView(this.dialogComponentRef.hostView);
        document.body.appendChild(this.dialogComponentRef.location.nativeElement);

        return instance;
    }

    /**
     * @ngdoc method
     * @name closeDialog
     * @methodOf app.services:ModalDialogService
     * @description
     * Cierra y destruye el diálogo modal actual. Este método se encarga de eliminar el componente del DOM y liberar su referencia.
     *
     * @example
     * <pre>
     * this.modalDialogService.closeDialog();
     * </pre>
     */
    closeDialog(): void {
        if (this.dialogComponentRef) {
            // Remover el diálogo del DOM y destruir la instancia.
            this.appRef.detachView(this.dialogComponentRef.hostView);
            this.dialogComponentRef.destroy();
            this.dialogComponentRef = null;
        }
    }
}
