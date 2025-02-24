import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function curpValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const curp = control.value;

    if (!curp) {
      return null;
    }

    const curpPattern = /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]\d$/;

    if (!curpPattern.test(curp)) {
      return { curpInvalid: true };
    }

    return null;
  };
}