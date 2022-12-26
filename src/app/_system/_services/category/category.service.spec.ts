import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { ICategoryResponse } from '../../_interfaces/todo-list/categories';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const mockedCategory = {id: 1, label: 'house'}

  const resourceUrl = environment.API_SERVICE_URL;
  const api = {
    categories: `${resourceUrl}categories`,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAll categories', () => {
    const expectData = [mockedCategory];
    service.getAllCategories().subscribe((data: ICategoryResponse[]) => {
      expect(data).toBe(expectData);
    });
    const req = httpMock.expectOne(api.categories, 'get to api');
    expect(req.request.method).toBe('GET');

    req.flush(expectData);

    httpMock.verify();
  });

  it('should create category', () => {
    service.createCategory(mockedCategory).subscribe((data: any) => {
      expect(data).toBe('');
    });

    const req = httpMock.expectOne(`${api.categories}`,'create item');
    expect(req.request.method).toBe('POST');

    req.flush('');

    httpMock.verify();
  });

  it('should update category', () => {
    service.updateCategory(mockedCategory).subscribe((data: any) => {
      expect(data).toBe('');
    });

    const req = httpMock.expectOne(`${api.categories}/${mockedCategory.id}`,'update item');
    expect(req.request.method).toBe('PATCH');

    req.flush('');

    httpMock.verify();
  });

  it('should delete category', () => {
    service.deleteCategory(mockedCategory).subscribe((data: any) => {
      expect(data).toBe('');
    });

    const req = httpMock.expectOne(`${api.categories}/${mockedCategory.id}`,'delete item');
    expect(req.request.method).toBe('DELETE');

    req.flush('');

    httpMock.verify();
  });
});
