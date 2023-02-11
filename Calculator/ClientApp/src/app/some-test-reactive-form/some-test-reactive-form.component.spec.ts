import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeTestReactiveFormComponent } from './some-test-reactive-form.component';

describe('SomeTestReactiveFormComponent', () => {
  let component: SomeTestReactiveFormComponent;
  let fixture: ComponentFixture<SomeTestReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomeTestReactiveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SomeTestReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
