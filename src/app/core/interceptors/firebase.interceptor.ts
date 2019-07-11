import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

const BASE_URL = 'https://ionicapp-7a398.firebaseio.com';

@Injectable({
  providedIn: 'root'
})
export class FirebaseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url[0] === '/') {
      const token = localStorage.getItem('token');
      req = req.clone({
        url: `${BASE_URL}${req.url}.json?auth=${token}`
      });
    }
    return next.handle(req);
  }

}
