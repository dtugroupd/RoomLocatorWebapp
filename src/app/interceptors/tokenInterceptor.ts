/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { Injectable, OnDestroy } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { TokenState } from '../_states/token.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {
  subscriptions: Subscription;

  constructor(public router: Router) {
    this.subscriptions = new Subscription();
  }

  @Select(TokenState.getToken) token$: Observable<string>;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.subscriptions.add(
      this.token$.subscribe(token => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      })
    );

    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          } else if (err.status === 403) {
            this.router.navigate(['/access-denied']);
          }
        }
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}