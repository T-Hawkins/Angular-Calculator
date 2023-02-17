import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
export const BASE_URL = new InjectionToken<string>('BASE_URL');

import { CalculatorComponent } from './calculator.component';
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ CalculatorComponent ],
      providers: [
        { provide: "BASE_URL", useValue: "http://localhost"},
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (value: string) => {
                  if (value == "userId") {
                    return "123";
                  }
                  if (value == "schoolId") {
                    return "123";
                  }
                  return undefined;
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly solve additions', () => {
    expect(component.processEquation("5+5")).toEqual(10)
    expect(component.processEquation("25+5")).toEqual(30)
    expect(component.processEquation("50+100")).toEqual(150)
    expect(component.processEquation("100+100")).toEqual(200)
  })
  it('should correctly solve multiplications', () => {
    expect(component.processEquation("5*5")).toEqual(25)
    expect(component.processEquation("25*5")).toEqual(125)
    expect(component.processEquation("50*100")).toEqual(5000)
    expect(component.processEquation("100*100")).toEqual(10000)
  })
  it('should correctly solve divisions', () => {
    expect(component.processEquation("5/5")).toEqual(1)
    expect(component.processEquation("25/5")).toEqual(5)
    expect(component.processEquation("50/100")).toEqual(0.5)
    expect(component.processEquation("1/100")).toEqual(0.01)
  })
  it('should correctly solve subtractions', () => {
    expect(component.processEquation("5-5")).toEqual(0)
    expect(component.processEquation("25-5")).toEqual(20)
    expect(component.processEquation("50-100")).toEqual(-50)
    expect(component.processEquation("100-123")).toEqual(-23)
  })
});
