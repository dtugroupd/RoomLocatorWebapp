/**
 * @author Hadi Horani, s144885
 */

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router, RouterStateSnapshot } from '@angular/router';

const jwtHelper = new JwtHelperService();


@Injectable()
export class AuthService {

    token: any;

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('token');

    if (this.token === null) {
      alert('You need to log in before you can use this feature');
      return false;
    } else if (jwtHelper.isTokenExpired(this.token)) {
      alert('Your token has expired, and therefore have to log in again');
      return false;
    } else {
      return true;
    }
  }
}