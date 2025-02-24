import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nssValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nss = control.value;

    if (!nss) {
      return null;
    }

    const nssPattern = /^\d{11}$/; 
    if (!nssPattern.test(nss)) {
      return { nssInvalid: true };
    }

    const oficina = nss.substring(0, 2);
    const añoAfiliación = nss.substring(2, 4);
    const añoNacimiento = nss.substring(4, 6);
    const consecutivo = nss.substring(6, 10);
    const digitoVerificador = nss.substring(10, 11);

    if (isNaN(Number(consecutivo)) || consecutivo.length !== 4) {
      return { nssInvalid: true };
    }

    // Verificar que el dígito verificador sea un número válido
    if (isNaN(Number(digitoVerificador)) || digitoVerificador.length !== 1) {
      return { nssInvalid: true };
    }

    return null;
  };
}