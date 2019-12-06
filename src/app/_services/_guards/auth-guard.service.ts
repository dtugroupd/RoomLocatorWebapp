/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { Injectable, OnInit } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { TokenState } from "src/app/_states/token.state";
import { Observable } from "rxjs";
import { User } from "src/app/models/login/user.model";
import { tap, map } from "rxjs/operators";

@Injectable()
export class AuthRouteGuard implements CanActivate {
  @Select(TokenState.getUser) user$: Observable<User>;
  @Select(TokenState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.userIsInRole(route);
  }

  userIsInRole(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const expectedRoles = route.data.expectedRoles;

    if (!expectedRoles) {
      return true;
    }

    return this.user$.pipe(
      map(user => {
        if (user) {
          const userRoleNames = user.roles.map(r => r.name);
          if (
            expectedRoles
              .map(r => r.name)
              .filter(e => userRoleNames.includes(e)).length === 0
          ) {
            this.router.navigate(["/access-denied"]);
            return false;
          } else {
            let requiresGeneralAdmin = false;
            expectedRoles.forEach(x => {
              if (x.name === "admin" && x.locationId === null) {
                requiresGeneralAdmin = true;
              }
            });

            if (!user.isGeneralAdmin && requiresGeneralAdmin) {
              this.router.navigate(["/access-denied"]);
              return false;
            }

            return true;
          }
        }
      })
    );
  }
}
