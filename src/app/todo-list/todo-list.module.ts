import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';
import { TodoListTasksComponent } from './todo-list-tasks/todo-list-tasks.component';
import { TodoListCategoriesComponent } from './todo-list-categories/todo-list-categories.component';
import { SharedModule } from '../shared/shared.module';
import { TaskDialogComponent } from './todo-list-tasks/task-dialog/task-dialog.component';
import { CategoryDialogComponent } from './todo-list-categories/category-dialog/category-dialog.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoListTasksComponent,
    TodoListCategoriesComponent,
    TaskDialogComponent,
    CategoryDialogComponent
  ],
    imports: [
        CommonModule,
        TodoListRoutingModule,
        SharedModule
    ]
})
export class TodoListModule { }
