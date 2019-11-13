/**
 * @author Hadi Horani, s144885
 */

import { Injectable, OnDestroy } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { TokenState } from '../_states/token.state';
import { Token } from '../models/login/user.model';



@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {

  subscriptions: Subscription;

  constructor(public router: Router) {
    this.subscriptions = new Subscription();
  }

  @Select(TokenState.getToken) token$: Observable<Token>;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (this.token$) {
    //   const token = 
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${this.token$}`
    //     }
    // });
    this.subscriptions.add(
      this.token$.subscribe(token => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token.token}`
            }
          });
        }
      })
    );

    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            window.location.href = 'https://auth.dtu.dk/dtu/?service=https://localhost:5001/api/v1/auth/validate';
          }
        }
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}