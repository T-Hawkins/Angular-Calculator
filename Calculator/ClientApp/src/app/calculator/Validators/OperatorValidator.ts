import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export function ensureEquationHasAnOperator(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasOperator = function (testValue: string): boolean {
      const operators = ['/', '*', '+', '-']
      const present = operators.map(x => testValue.indexOf(x) > 0)
      return present.some(x => x)
    };

    return !hasOperator(value) ? {operatorMissing:true} : null;
  }
}
