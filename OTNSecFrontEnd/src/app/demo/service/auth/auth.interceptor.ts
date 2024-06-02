import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('token');

    if (localToken) {
      // If token exists, add it to the request headers
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localToken}`
        }
      });
      // Proceed with the modified request
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle 401 Unauthorized error here
            console.log('401 Unauthorized');
            // Optionally, you can redirect the user to the login page
            this.router.navigate(['/auth/login']);
          }
          return throwError(error);
        })
      );
    } else {
      // If token doesn't exist, return an HTTP error response with status code 401
      console.log('Token not found');
      return throwError(new HttpErrorResponse({ status: 401 }));
    }
  }
}
