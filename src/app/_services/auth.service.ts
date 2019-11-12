/**
 * @author Hadi Horani, s144885
 */

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store, Select } from '@ngxs/store';
import { GetUser, SetToken } from '../_actions/user.actions';
import { Subscription, Observable } from 'rxjs';
import { UserState, UserStateModel } from '../_states/user.state';
import { User, Token } from '../models/login/user.model';
import { environment } from 'src/environments/environment';

const jwtHelper = new JwtHelperService();


@Injectable()
export class AuthService {

    token: any;
    subscription: Subscription;
    @Select(UserState.getToken) token$: Observable<Token>;
    @Select(UserState.getUser) user$: Observable<User>;


  constructor(private store: Store) {}

  public isAuthenticated(): boolean {
    // this.token = localStorage.getItem('tokenValue');

    // if (this.token === null) {
    //   alert('You need to log in before you can use this feature');
    //   return false;
    // } else if (jwtHelper.isTokenExpired(this.token)) {
    //   alert('Your token has expired, and therefore you have to log in again');
    //   return false;
    // } else if (this.token$ === null) {
    //   alert('store is empty')
    //   return true;
    // } else {
    //   return true;
    // }

    let token: Token;
    this.token$.subscribe(x => token = x);
    return token != null && !jwtHelper.isTokenExpired(token.token)
  }

  public authenticate() {
    let localJwtToken = localStorage.getItem('tokenValue');
    if (localJwtToken !== null)
    {
      alert('HIT ME HERE')
      this.setToken(localJwtToken);
      return;
    }

    alert('HIT ME HERE 222')
    const apiUrl = environment.backendUrl;
    alert('authenticating')
    window.location.href = `https://auth.dtu.dk/dtu?service=${apiUrl}/api/v1/auth/validate`;
  }

  private setToken(jwtToken) {
    this.store.dispatch(new GetUser());
    let token: Token;
    this.user$.subscribe(user => {
      alert('uSer ' + user);
      token.user = user;
      token.token = jwtToken;
      alert(`user: ${user}`)

      this.store.dispatch(new SetToken(token));
    });
  }
}
