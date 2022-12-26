import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListTasksComponent } from './todo-list-tasks.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormBuilder } from '@angular/forms';

describe('TodoListTasksComponent', () => {
  let component: TodoListTasksComponent;
  let fixture: ComponentFixture<TodoListTasksComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListTasksComponent ],
      providers: [HttpClient, HttpHandler, MatDialog, Overlay, FormBuilder],
      imports: [MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
