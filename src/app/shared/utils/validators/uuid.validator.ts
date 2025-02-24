import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uuidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let uuid = control.value;

    if (!uuid) {
      return null;
    }

    uuid = uuid.trim().toUpperCase();

    const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/;

    if (!uuidPattern.test(uuid)) {
      return { uuidInvalid: true };
    }

    return null;
  };
}


