import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * @ngdoc enum
 * @name app.enums:TipoAlerta
 * @description
 * Enumeración que define los tipos de alerta que pueden ser mostrados: éxito, información, precaución y error.
 * Estos valores son utilizados para determinar el estilo de la alerta.
 */
export enum TipoAlerta {
    Exito = 'success',
    Info = 'info',
    Precaucion = 'warning',
    Error = 'error',
}

/**
 * @ngdoc service
 * @name app.services:AlertaService
 * @description
 * Servicio que gestiona la visualización de alertas utilizando el `MessageService` de PrimeNG.
 * Permite mostrar diferentes tipos de alertas como éxito, información, advertencias o errores.
 * Además, puede limpiar alertas existentes o mostrar múltiples alertas.
 */
@Injectable()
export class AlertaService {

    constructor(private messageService: MessageService) { }

    /**
     * @ngdoc method
     * @name mostrar
     * @methodOf app.services:AlertaService
     * @description
     * Muestra una alerta en pantalla. Limpia cualquier alerta previa antes de mostrar la nueva.
     * 
     * @param {TipoAlerta} tipo El tipo de alerta a mostrar (éxito, información, advertencia o error).
     * @param {string} summary El título/resumen de la alerta.
     * @param {string} mensaje El mensaje detallado de la alerta.
     * @param {boolean} [fijo=false] Indica si la alerta debe ser fija (si es `true`, no desaparecerá automáticamente).
     * 
     * @example
     * <pre>
     * this.alertaService.mostrar(TipoAlerta.Exito, 'Operación exitosa', 'Los datos se guardaron correctamente', true);
     * </pre>
     */
    public mostrar(
        tipo: TipoAlerta,
        summary: string,
        mensaje: string,
        fijo?: boolean
    ) {
        this.limpiarAlertas();
        let severity = '';
        switch (tipo) {
            case TipoAlerta.Exito:
                severity = 'success';
                break;
            case TipoAlerta.Info:
                severity = 'info';
                break;
            case TipoAlerta.Precaucion:
                severity = 'warn';
                break;
            case TipoAlerta.Error:
                severity = 'error';
                break;
            default:
                severity = 'info';
                break;
        }
        this.messageService.add({
            severity,
            summary,
            detail: mensaje,
            sticky: !!fijo,
        });
    }

    /**
     * @ngdoc method
     * @name limpiarAlertas
     * @methodOf app.services:AlertaService
     * @description
     * Elimina todas las alertas actuales de la pantalla.
     * 
     * @example
     * <pre>
     * this.alertaService.limpiarAlertas();
     * </pre>
     */
    public limpiarAlertas() {
        this.messageService.clear();
    }

    /**
     * @ngdoc method
     * @name mostrarMultiple
     * @methodOf app.services:AlertaService
     * @description
     * Muestra múltiples alertas en la pantalla sin limpiar las alertas previas.
     * 
     * @param {TipoAlerta} tipo El tipo de alerta a mostrar (éxito, información, advertencia o error).
     * @param {string} summary El título/resumen de la alerta.
     * @param {string} mensaje El mensaje detallado de la alerta.
     * @param {boolean} [fijo=false] Indica si la alerta debe ser fija (si es `true`, no desaparecerá automáticamente).
     * 
     * @example
     * <pre>
     * this.alertaService.mostrarMultiple(TipoAlerta.Info, 'Actualización', 'Se ha actualizado correctamente', false);
     * </pre>
     */
    public mostrarMultiple(
        tipo: TipoAlerta,
        summary: string,
        mensaje: string,
        fijo?: boolean
    ) {
        let severity: string = '';
        switch (tipo) {
            case TipoAlerta.Exito:
                severity = 'success';
                break;
            case TipoAlerta.Info:
                severity = 'info';
                break;
            case TipoAlerta.Precaucion:
                severity = 'warn';
                break;
            case TipoAlerta.Error:
                severity = 'error';
                break;
            default:
                severity = 'info';
                break;
        }
        this.messageService.add({
            severity,
            summary,
            detail: mensaje,
            sticky: !!fijo,
        });
    }
}
