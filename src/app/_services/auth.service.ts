/**
 * @author Hadi Horani, s144885
 */

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store, Select } from '@ngxs/store';
import { GetUser } from '../_actions/user.actions';
import { Subscription, Observable } from 'rxjs';
import { UserState } from '../_states/user.state';
import { User, Token } from '../models/login/user.model';

const jwtHelper = new JwtHelperService();


@Injectable()
export class AuthService {

    token: any;
    subscription: Subscription;
    @Select(UserState.getToken) token$: Observable<Token>;


  constructor(private store: Store) {}

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('tokenValue');

    if (this.token === null) {
      alert('You need to log in before you can use this feature');
      return false;
    } else if (jwtHelper.isTokenExpired(this.token)) {
      alert('Your token has expired, and therefore you have to log in again');
      return false;
    } else if (this.token$ === null) {
      this.store.dispatch(new GetUser());
    } else {
      return true;
    }
  }
}
