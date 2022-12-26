import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { ITaskResponse } from '../../_interfaces/todo-list/tasks';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockedTask = {id: 1, label: 'Kitchen', description: 'Clean', category: 'house', done: false}

  const resourceUrl = environment.API_SERVICE_URL;
  const api = {
    tasks: `${resourceUrl}tasks`,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAll tasks', () => {
    const expectData = [mockedTask];
    service.getAllTasks().subscribe((data: ITaskResponse[]) => {
      expect(data).toBe(expectData);
    });
    const req = httpMock.expectOne(api.tasks, 'get items');
    expect(req.request.method).toBe('GET');

    req.flush(expectData);

    httpMock.verify();
  });

  it('should create task', () => {
    service.createTask(mockedTask).subscribe((data: any) => {
      expect(data).toBe('');
    });

    const req = httpMock.expectOne(`${api.tasks}`,'create item');
    expect(req.request.method).toBe('POST');

    req.flush('');

    httpMock.verify();
  });

  it('should update task', () => {
    service.updateTask(mockedTask).subscribe((data: any) => {
      expect(data).toBe('');
    });

    const req = httpMock.expectOne(`${api.tasks}/${mockedTask.id}`,'update item');
    expect(req.request.method).toBe('PATCH');

    req.flush('');

    httpMock.verify();
  });

  it('should delete task', () => {
    service.deleteTask(mockedTask).subscribe((data: any) => {
      expect(data).toBe('');
    });

    const req = httpMock.expectOne(`${api.tasks}/${mockedTask.id}`,'delete item');
    expect(req.request.method).toBe('DELETE');

    req.flush('');

    httpMock.verify();
  });
});
