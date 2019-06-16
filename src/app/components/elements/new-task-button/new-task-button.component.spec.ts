import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskButtonComponent } from './new-task-button.component';

describe('NewTaskButtonComponent', () => {
  let component: NewTaskButtonComponent;
  let fixture: ComponentFixture<NewTaskButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
