import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Form, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ensureEquationHasOnlyValidCharacters} from "../calculator/Validators/EquationFormatValidator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public inputForm!: FormGroup;
  private router: Router;

  constructor(router: Router) {
    this.router = router
  }

  get userId() {
    return Number(this.inputForm.controls['userId'].value);
  }
  get schoolId() {
    return this.inputForm.controls['schoolId'].value;
  }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      schoolId: new FormControl('', [
        Validators.pattern(/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/)
      ]),
      userId: new FormControl("", [
        Validators.min(1),
        Validators.max(99999999)
      ])
    });
  }

  onSubmit(): void {
    console.log("schoolID:", this.schoolId)
    console.log("userID:", this.userId)
    this.router.navigateByUrl(`/${this.schoolId}/maths/${this.userId}`);
  }
}
