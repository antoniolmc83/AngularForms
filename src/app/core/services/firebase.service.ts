import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const SIGN_IN_API = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
const API_KEY = 'AIzaSyBGBh-Ydc8nr1xL3FF54ANkfiZIDG62YvY';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  signIn(credentials: {email, password}): Observable<any> {
    const body = {...credentials, returnSecureToken: true};
    return this.http.post(`${SIGN_IN_API}${API_KEY}`, body);
  }


  getTasks(): Observable<any> {
    return this.http.get(`/tasks`)
      .pipe(
        map(res => Object.keys(res).map(key => ({ id: key, ...res[key] }) ))
      );
  }

  getTask(id): Observable<any> {
    return this.http.get(`/tasks/${id}`);
  }

  createTask(body: {description, completed}): Observable<any> {
    return this.http.post('/tasks', body);
  }

  updateTask(id, body: {description, completed}): Observable<any> {
    return this.http.put(`/tasks/${id}`, body);
  }

  deleteTask(id): Observable<any> {
    return this.http.delete(`/tasks/${id}`);
  }

}
