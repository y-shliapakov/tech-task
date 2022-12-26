import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ICategoryResponse } from '../../_interfaces/todo-list/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoryUpdated$ = new Subject();

  private resourceUrl = environment.API_SERVICE_URL;

  private api = {
    categories: `${this.resourceUrl}categories`,
  };

  constructor(
    private readonly http: HttpClient
  ) { }

  createCategory(category: ICategoryResponse): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(`${this.api.categories}`, category)
  }

  getAllCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.api.categories);
  }

  updateCategory(category: ICategoryResponse): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${this.api.categories}/${category.id}`, category)
  }

  deleteCategory(category: ICategoryResponse): Observable<ICategoryResponse> {
    return this.http.delete<ICategoryResponse>(`${this.api.categories}/${category.id}`)
  }
}
