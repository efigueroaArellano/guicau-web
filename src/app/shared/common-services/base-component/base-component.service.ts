import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * @ngdoc service
 * @name app.services:BaseComponentService
 * @description
 * Este servicio proporciona una base para manejar formularios reactivos en componentes de Angular.
 * Utiliza `FormBuilder` para crear y gestionar formularios dentro de la aplicación.
 *
 * @example
 * <pre>
 * // Ejemplo de uso en un componente
 * constructor(private baseComponentService: BaseComponentService) {
 *    this.baseComponentService.form = this.formBuilder.group({
 *       campo1: [''],
 *       campo2: ['']
 *    });
 * }
 * </pre>
 */
@Injectable({
    providedIn: 'root'
})
export class BaseComponentService {

    /**
     * @ngdoc property
     * @name form
     * @propertyOf app.services:BaseComponentService
     * @description
     * La propiedad `form` es un objeto `FormGroup` que contiene la estructura y el estado del formulario.
     * Puede ser inicializada dentro de los componentes que heredan este servicio.
     * 
     * @type {FormGroup}
     */
    public form!: FormGroup;

    /**
     * @ngdoc method
     * @name constructor
     * @methodOf app.services:BaseComponentService
     * @description
     * Constructor que inyecta `FormBuilder` para la creación y manejo de formularios reactivos.
     * 
     * @param {FormBuilder} formBuilder El servicio `FormBuilder` de Angular para crear formularios.
     */
    constructor(protected formBuilder: FormBuilder) { }

    /**
     * @ngdoc property
     * @name formulario
     * @propertyOf app.services:BaseComponentService
     * @description
     * Un getter que retorna los controles del formulario reactivo. Se utiliza para acceder de manera
     * sencilla a los campos del formulario en los componentes.
     * 
     * @returns {FormGroup['controls']} Retorna los controles del formulario reactivo.
     * 
     * @example
     * <pre>
     * // Ejemplo de cómo acceder a los controles
     * const campo1Control = this.baseComponentService.formulario.campo1;
     * </pre>
     */
    public get formulario() {
        return this.form.controls;
    }

}
