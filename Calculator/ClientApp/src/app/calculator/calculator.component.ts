import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ensureEquationHasOnlyValidCharacters} from "./Validators/EquationFormatValidator";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  equationHistory: EquationDto[] = [];
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
            this.equationHistory.push(val)
          })
        })

    this.inputForm = new FormGroup({
      equation: new FormControl('', [
        ensureEquationHasOnlyValidCharacters()
      ]),
    });
  }

  addValue(value:string): void {
    this.inputForm.setValue({
      equation: this.inputForm.value.equation.concat(value)
    })
  }

  onSubmit(): void {
    this.equationHistory.push({id: this.equationHistory.length, equation: this.inputForm.value.equation, mouseOn: false})
    this.processEquationAndAssignToResult(this.inputForm.value.equation);
    this.inputForm.reset()
  }

  resubmitEvent(equation: EquationDto) : void {
    this.processEquationAndAssignToResult(equation.equation);
    this.inputForm.reset()
  }

  processEquationAndAssignToResult(rawEquation: string): void {
    // TODO: add step to modify equation when requesting previous result

    let workingEquation: string = rawEquation.replaceAll(' ', '')
      .replaceAll('/', ' / ')
      .replaceAll('*', ' * ')
      .replaceAll('+', ' + ')
      .replaceAll('-', ' - ');

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

  handleMouseOver(equation: EquationDto) : void {
    equation.mouseOn = true;
  }
  handleMouseLeave(equation: EquationDto) : void {
    equation.mouseOn = false;
  }

  removeLastCharacter() : void {
    const equation: string = this.inputForm.value.equation;
    this.inputForm.setValue({equation: equation.substring(0, equation.length - 1)})
  }
}

interface EquationDto {
  id: number
  equation: string
  mouseOn: boolean
}
