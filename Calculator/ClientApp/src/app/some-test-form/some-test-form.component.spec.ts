import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeTestFormComponent } from './some-test-form.component';

describe('SomeTestFormComponent', () => {
  let component: SomeTestFormComponent;
  let fixture: ComponentFixture<SomeTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomeTestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SomeTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
