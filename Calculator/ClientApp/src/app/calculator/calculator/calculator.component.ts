import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  equationInput:string = ""; // initialize with an empty input
  equationRaw:string = ""; // initialize with an empty input
  history:Map<number, string>;
  public inputForm!: FormGroup;

  get equation() {
    return this.inputForm.controls['equation'];
  }

  constructor() {
    this.history = new Map<number, string>()
    this.history.set(1, "1 + 1")
    this.history.set(2, "35 * 6")
    this.history.set(3, "65 - 23")
    this.history.set(4, "65 / 5")
    this.history.set(5, "3 * 12")
  }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      equation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]),
    });
  }

  addValue(value:string): void {
    this.inputForm.setValue({
      equation: this.inputForm.value.equation.concat(value)
    })
  }
}
