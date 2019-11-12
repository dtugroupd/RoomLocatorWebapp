/**
 * @author Hadi Horani, s144885
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { UserState } from '../_states/user.state';
import { Token } from '../models/login/user.model';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

   constructor(public router: Router) {}

   @Select(UserState.getToken) token$: Observable<Token>;

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.token$) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token$}`
        }
    });
    }

    return next.handle(request).pipe(tap( () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/login']);
               }
          }
        }
      ));
  }
}