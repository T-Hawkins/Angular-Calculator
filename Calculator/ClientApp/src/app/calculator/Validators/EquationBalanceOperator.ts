import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export function ensureEquationIsBalanced(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const findOperator = function (testValue: string): string[] {
      const operators = ['/', '*', '+', '-']
      return operators.filter(x => testValue.indexOf(x) > 0)
    };

    const presentOperators = findOperator(value)
    if (presentOperators.length > 1) {
      return {unbalancedEquation: true}
    }

    const operator = presentOperators[0]
    const split = value.split(operator)

    return split.length !== 2 ? {unbalancedEquation:true} : null;
  }
}
