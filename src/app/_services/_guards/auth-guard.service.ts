/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { TokenState } from 'src/app/_states/token.state';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/login/user.model';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AuthRouteGuard implements CanActivate {

  @Select(TokenState.getUser) user$: Observable<User>;
  @Select(TokenState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.userIsInRole(route);
  }

  userIsInRole(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const expectedRolesString = route.data.expectedRoles;

    if (!expectedRolesString) {
      return true;
    }

    const expectedRoles = expectedRolesString.split(/[ ,]+/);

    if (expectedRoles.length === 0) {
      return true;
    }

    return this.user$.pipe(map(user => {

      if (expectedRoles.filter(e => user.roles.includes(e)).length === 0) {
        this.router.navigate(["/access-denied"]);
        return false;
      } else {
        return true;
      }
    }));
  }
}
