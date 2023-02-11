import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ensureEquationHasAnOperator} from "./Validators/OperatorValidator";
import {ensureEquationIsBalanced} from "./Validators/EquationBalanceOperator";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  equationInput:string = ""; // initialize with an empty input
  equationRaw:string = ""; // initialize with an empty input

  history: EquationDto[] = [];
  public inputForm!: FormGroup;
  public equationResult: number = 0;

  private baseUrl: string;
  private http: HttpClient;


  get equation() {
    return this.inputForm.controls['equation'];
  }



  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.http.get<EquationDto[]>(this.baseUrl + 'calculator')
      .subscribe(equations => {
          equations.forEach(val => {
            this.history.push(val)
          })
        })

    this.inputForm = new FormGroup({
      equation: new FormControl('', [
        Validators.required,
        ensureEquationHasAnOperator(),
        ensureEquationIsBalanced()
        // Validators.minLength(4),
        // Validators.maxLength(10)
      ]),
    });
  }

  addValue(value:string): void {
    this.inputForm.setValue({
      equation: this.inputForm.value.equation.concat(value)
    })
  }

  onSubmit(): void {
    this.history.push({id: this.history.length, equation: this.inputForm.value.equation})
    this.processEquationAndAssignToResult();
    this.inputForm.reset()
  }

  processEquationAndAssignToResult(): void {
    const rawEquation: string = this.inputForm.value.equation;

    // TODO: add step to modify equation when requesting previous result

    const workingEquation: string = rawEquation.replace(' ', '')
      .replace('/', ' / ')
      .replace('*', ' * ')
      .replace('+', ' + ')
      .replace('-', ' - ');

    const equationParts: string[] = workingEquation.split(' ');
    const left: number = parseFloat(equationParts[0])
    const right: number = parseFloat(equationParts[2])
    let result: number = 0;
    switch(equationParts[1]) {
      case '/':
        result = left/right
        break;
      case '*':
        result = left * right
        break;
      case '+':
        result = left + right
        break;
      case '-':
        result = left - right
        break;
    }
    this.equationResult = result;
  }
}

interface EquationDto {
  id: number
  equation: string
}
