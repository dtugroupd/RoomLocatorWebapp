/**
 * @author Hadi Horani, s144885
 */

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngxs/store';
import { GetUser } from '../_actions/user.actions';
import { Subscription } from 'rxjs';

const jwtHelper = new JwtHelperService();


@Injectable()
export class AuthService {

    token: any;
    subscription: Subscription;

  constructor(private store: Store) {}

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('token');

    if (this.token === null) {
      alert('You need to log in before you can use this feature');
      return false;
    } else if (jwtHelper.isTokenExpired(this.token)) {
      alert('Your token has expired, and therefore you have to log in again');
      return false;
    } else {
      this.store.dispatch(new GetUser());
      return true;
    }
  }
}