import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategoryResponse } from '../../_system/_interfaces/todo-list/categories';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoryService } from '../../_system/_services/category/category.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo-list-categories',
  templateUrl: './todo-list-categories.component.html',
  styleUrls: ['./todo-list-categories.component.scss']
})
export class TodoListCategoriesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'label', 'action'];

  categories: ICategoryResponse[] = [];

  private destroyed$ = new Subject();

  constructor(
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initSubscriptions();
    this.loadAllCategories();
  }

  ngOnDestroy(): void {
    this.destroyed$.next('destroy');
  }

  initSubscriptions(): void {
    this.categoryService.categoryUpdated$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.loadAllCategories();
      })
  }

  loadAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  editCategory(category: ICategoryResponse): void {
    this.dialog.open(CategoryDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'category-dialog',
      disableClose: true,
      autoFocus: false,
      data: category
    }).afterClosed().subscribe(updatedCategory => {
      if (updatedCategory) {
        this.categoryService.updateCategory(updatedCategory).subscribe(() => {
          this.categoryService.categoryUpdated$.next('updated');
        });
      }
    })
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.deleteCategory(category).subscribe(() => {
      this.categoryService.categoryUpdated$.next('updated');
    })
  }

  getLastIndex(): number {
    if (!this.categories.length) {
      return 1
    }
    return this.categories[this.categories.length - 1].id;
  }

}
