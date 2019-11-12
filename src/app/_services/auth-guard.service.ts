/**
 * @author Hadi Horani, s144885
 */

import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
 
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      alert('not logged in')
      this.auth.authenticate();
      return false;
    } else {
      alert('is logged in')
      return true;
    }
  }
}