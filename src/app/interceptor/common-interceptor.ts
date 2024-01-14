import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  data!: string | null;

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    if (request.url.includes('suAdmin')) {
      this.data = localStorage.getItem('super-infoTech');
    } else if (request.url.includes('admin')) {
      this.data = localStorage.getItem('admin-infoTech');
    } else {
      this.data = localStorage.getItem('infoTech');
    }

    if (this.data) {
      let tokenized = request.clone({
        setHeaders: {
          Authorization: `${this.data}`
        }
      });

      return next.handle(tokenized).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.router.navigate(['/']);
            localStorage.removeItem('admin-infoTech');
            localStorage.removeItem('super-infoTech');
            localStorage.removeItem('infoTech');
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
