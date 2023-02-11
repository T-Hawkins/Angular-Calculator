import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Hero } from "../hero";

@Component({
  selector: 'app-some-test-form',
  templateUrl: './some-test-form.component.html',
  styleUrls: ['./some-test-form.component.css'],
})
export class SomeTestFormComponent {

  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr. IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }

  newHero() {
    this.model = new Hero(42, '', '');
  }

}
