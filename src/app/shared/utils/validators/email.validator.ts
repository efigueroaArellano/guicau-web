import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = emailRegex.test(control.value);
        return valid ? null : { invalidEmail: true };
    };
}