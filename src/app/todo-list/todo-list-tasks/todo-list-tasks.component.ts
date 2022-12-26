import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../_system/_services/task/task.service';
import { ITaskResponse } from '../../_system/_interfaces/todo-list/tasks';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategoryResponse } from '../../_system/_interfaces/todo-list/categories';
import { CategoryService } from '../../_system/_services/category/category.service';

@Component({
  selector: 'app-todo-list-tasks',
  templateUrl: './todo-list-tasks.component.html',
  styleUrls: ['./todo-list-tasks.component.scss']
})
export class TodoListTasksComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['mark', 'position', 'label', 'category', 'status', 'action'];

  public tasks: ITaskResponse[] = [];
  public categories: ICategoryResponse[] = [];
  public filteredTasks: ITaskResponse[] = [];
  public filterForm: FormGroup;
  private destroyed$ = new Subject();

  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.initSubscriptions();
    this.loadAllTasks();
    this.loadAllCategories();
  }

  ngOnDestroy(): void {
    this.destroyed$.next('destroy');
  }

  initSubscriptions(): void {
    this.taskService.taskUpdated$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.loadAllTasks();
      });
  }

  initFilterForm(): void {
    this.filterForm = this.fb.group({
      inProgress: [null],
      done: [null],
      categories: [null],
    });
  }

  loadFilterForm(): void {
    this.filterForm.patchValue({
      inProgress: true,
      done: true,
      categories: [...this.categories.map(e => e.label)],
    });
  }

  loadAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.loadFilterForm();
    })
  }

  loadAllTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = this.tasks;
    })
  }

  editTask(task: ITaskResponse): void {
    this.dialog.open(TaskDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'task-dialog',
      disableClose: true,
      autoFocus: false,
      data: task
    }).afterClosed().subscribe(updatedTask => {
      if (updatedTask) {
        console.log(updatedTask)
        this.taskService.updateTask(updatedTask).subscribe(() => {
          this.loadAllTasks();
        });
      }
    })
  }

  deleteTask(task: ITaskResponse): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.loadAllTasks();
    })
  }

  markTask(task: ITaskResponse, isChecked: boolean): void {
    const markedTask = {
      ...task,
      done: isChecked ? moment().format('DD-MM-YYYY') : false
    }
    this.taskService.updateTask(markedTask).subscribe(task => {
      this.loadAllTasks();
    });
  }

  submitForm(isReset: boolean = false): void {
    if (isReset) {
      this.filteredTasks = this.tasks;
      this.filterForm.patchValue({
        inProgress: true,
        done: true,
        categories: this.categories.map(category => category.label)
      })
    } else {
      const tasks = JSON.stringify(this.tasks);
      const parsedTasks = JSON.parse(tasks);

      let filterByInProgress = [];
      let filterByDone = [];
      let filterByCategories = [];
      this.filteredTasks = [];

      if (this.valueByControl('inProgress') as string) {
        filterByInProgress = parsedTasks.filter(task => !task.done);
        filterByInProgress.forEach(task => {
          if (!this.filteredTasks.find(e => e.id === task.id)) {
            this.filteredTasks.push(task)
          }
        });
      }
      if (this.valueByControl('done') as string) {
        filterByDone = parsedTasks.filter(task => task.done);
        filterByDone.forEach(task => {
          if (!this.filteredTasks.find(e => e.id === task.id)) {
            this.filteredTasks.push(task)
          }
        })
      }
      if (this.valueByControl('categories') && this.valueByControl('categories').length) {
        (this.valueByControl('categories') as string[]).forEach(category => {
          filterByCategories = [...filterByCategories, ...parsedTasks.filter(e => e.category === category)];
        })
        filterByCategories.forEach(task => {
          if (!this.filteredTasks.find(e => e.id === task.id)) {
            this.filteredTasks.push(task)
          }
        })
      }
    }
  }

  getLastIndex(): number {
    if (!this.tasks.length) {
      return 1
    }
    return this.tasks[this.tasks.length - 1].id;
  }

  valueByControl(control: string): string | string[] {
    return this.filterForm.controls[control].value;
  }

}
