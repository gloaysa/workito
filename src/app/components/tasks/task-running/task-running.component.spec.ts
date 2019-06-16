import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRunningComponent } from './task-running.component';

describe('TaskRunningComponent', () => {
  let component: TaskRunningComponent;
  let fixture: ComponentFixture<TaskRunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskRunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
