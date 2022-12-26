import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './todo-list-tasks/task-dialog/task-dialog.component';
import { TaskService } from '../_system/_services/task/task.service';
import { CategoryDialogComponent } from './todo-list-categories/category-dialog/category-dialog.component';
import { CategoryService } from '../_system/_services/category/category.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
  ) { }

  openAction(actionID: number, lastID: number): void {
    switch (actionID) {
      case 0:
        this.dialog.open(CategoryDialogComponent, {
          backdropClass: 'dialog-back',
          panelClass: 'category-dialog',
          disableClose: true,
          autoFocus: false,
        }).afterClosed().subscribe(category => {
          if (category) {
            category.id = lastID + 1;
            this.categoryService.createCategory(category).subscribe(() => {
              this.categoryService.categoryUpdated$.next('updated');
            });
          }
        });
        break;
      case 1:
        this.dialog.open(TaskDialogComponent, {
          backdropClass: 'dialog-back',
          panelClass: 'task-dialog',
          disableClose: true,
          autoFocus: false,
        }).afterClosed().subscribe(task => {
          if (task) {
            task.id = lastID + 1;
            this.taskService.createTask(task).subscribe(() => {
              this.taskService.taskUpdated$.next('updated');
            });
          }
        });
        break;
    }
  }

}
