import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ITaskResponse } from '../../_interfaces/todo-list/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public taskUpdated$ = new Subject();

  private resourceUrl = environment.API_SERVICE_URL;

  private api = {
    tasks: `${this.resourceUrl}tasks`,
  };

  constructor(
    private readonly http: HttpClient
  ) { }

  getAllTasks(): Observable<ITaskResponse[]> {
    return this.http.get<ITaskResponse[]>(this.api.tasks)
  }

  createTask(task: ITaskResponse): Observable<ITaskResponse> {
    return this.http.post<ITaskResponse>(`${this.api.tasks}`, task)
  }

  updateTask(task: ITaskResponse): Observable<ITaskResponse> {
    return this.http.patch<ITaskResponse>(`${this.api.tasks}/${task.id}`, task)
  }

  deleteTask(task: ITaskResponse): Observable<ITaskResponse> {
    return this.http.delete<ITaskResponse>(`${this.api.tasks}/${task.id}`)
  }
}
