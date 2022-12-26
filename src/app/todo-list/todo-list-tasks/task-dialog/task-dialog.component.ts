import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITaskResponse } from '../../../_system/_interfaces/todo-list/tasks';
import { CategoryService } from '../../../_system/_services/category/category.service';
import { ICategoryResponse } from '../../../_system/_interfaces/todo-list/categories';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  taskForm: FormGroup;
  categories: ICategoryResponse[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITaskResponse,
    private readonly categoriesService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initTaskForm();
    this.loadTaskForm();
    this.loadCategories();
  }

  initTaskForm(): void {
    this.taskForm = this.fb.group({
      label: [null, [Validators.required]],
      description: [null],
      category: [null, [Validators.required]]
    })
  }

  loadTaskForm(): void {
    if (this.data) {
      this.taskForm.patchValue({
        label: this.data.label,
        description: this.data.description,
        category: this.data.category
      })
    }
  }

  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  save(): void {
    if (this.taskForm.valid) {
      const task = {
        ...this.data,
        ...this.taskForm.value
      }
      if (!task.done) {
        task.done = false;
      }
      this.dialogRef.close(task);
    }
  }

}
