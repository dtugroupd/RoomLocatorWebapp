/**
 * @author Hadi Horani, s144885
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { User } from '../models/login/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  fetchUser(): Observable<User> {
    return this.http.get<User>(`${this.backendBaseUrl}/api/v1/user/me`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.backendBaseUrl}/api/v1/auth/login`, { username, password });
  }
}
