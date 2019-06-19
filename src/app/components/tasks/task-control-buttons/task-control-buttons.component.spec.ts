import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskControlButtonsComponent } from './task-control-buttons.component';

describe('TaskControlButtonsComponent', () => {
  let component: TaskControlButtonsComponent;
  let fixture: ComponentFixture<TaskControlButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskControlButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskControlButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
