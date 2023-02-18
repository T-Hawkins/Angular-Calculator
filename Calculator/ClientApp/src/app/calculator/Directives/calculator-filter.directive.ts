import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appCalculatorFilterDirective]'
})

export class CalculatorFilterDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    switch(event.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case "-":
      case "+":
      case "/":
      case "*":
      case "Backspace":
      case "Enter":
        return;
      default:
        event.preventDefault();
        break;
    }
  }
}
