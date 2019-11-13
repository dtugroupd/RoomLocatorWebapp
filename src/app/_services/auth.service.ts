/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TokenState } from '../_states/token.state';
import { Login } from '../_actions/token.actions';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {
  @Select(TokenState.getToken) token$: Observable<string>;


  constructor(private store: Store) { }

  public isAuthenticated(): boolean {
    let token = null;

    this.token$.pipe(tap(t => {
      token = t;
    }));

    return token !== null && !jwtHelper.isTokenExpired(token.token);
  }

  public authenticate() {
    this.store.dispatch(new Login());
  }

  public loginWithSso() {
    window.location.href = `https://auth.dtu.dk/dtu?service=${environment.backendUrl}/api/v1/auth/validate`;
  }
}
