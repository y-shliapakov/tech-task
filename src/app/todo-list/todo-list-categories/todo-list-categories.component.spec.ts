import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListCategoriesComponent } from './todo-list-categories.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TodoListCategoriesComponent', () => {
  let component: TodoListCategoriesComponent;
  let fixture: ComponentFixture<TodoListCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListCategoriesComponent ],
      providers: [MatDialog, Overlay, HttpClient, HttpHandler],
      imports: [MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
