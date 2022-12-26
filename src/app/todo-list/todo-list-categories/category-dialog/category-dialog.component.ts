import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITaskResponse } from '../../../_system/_interfaces/todo-list/tasks';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  categoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITaskResponse
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategoryForm();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      label: [null, [Validators.required]]
    })
  }

  loadCategoryForm(): void {
    if (this.data) {
      this.categoryForm.patchValue({
        label: this.data.label
      })
    }
  }

  save(): void {
    if (this.categoryForm.valid) {
      const category = {
        ...this.data,
        ...this.categoryForm.value
      }
      this.dialogRef.close(category);
    }
  }

}
