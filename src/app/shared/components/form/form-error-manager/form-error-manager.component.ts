import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Component({
    selector: 'app-form-error-manager',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './form-error-manager.component.html',
    styleUrl: './form-error-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class FormErrorManagerComponent {

    constructor () {}

    readonly msgRequerido = "El campo es obligatorio";

    readonly msgEstructuraCorreo = "El campo no cumple la estructura de correo";

    readonly msgEstructuraCURP = "El campo no cumple la estructura de CURP";

    readonly msgEstructuraNSS = "El campo no cumple la estructura de NSS";

    readonly msgEstructuraCFDI = "El campo no cumple la estructura de CFDI";

    readonly msgValorCero = "El valor del campo debe ser mayor a 0";

    @Input() control!: AbstractControl | null;

    get errorKey(): string | null {
        return this.control && this.control.errors ? Object.keys(this.control.errors)[0] : null;
    }

}
