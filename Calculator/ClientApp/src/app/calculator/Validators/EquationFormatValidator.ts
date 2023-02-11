import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export function ensureEquationHasOnlyValidCharacters(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    return /^\d*\.?\d+ ?[*\-+\/] ?\d*\.?\d+$/.test(value) ? null : {invalidFormat: true}
  }
}
