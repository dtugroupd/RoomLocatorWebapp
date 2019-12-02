/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { User, AuthenticatedModel, LoginModel, UserDisclaimer } from '../models/login/user.model';
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

  login(loginModel: LoginModel): Observable<AuthenticatedModel> {
    return this.http.post<AuthenticatedModel>(`${this.backendBaseUrl}/api/v1/auth/login`, loginModel);
  }

  hasAcceptedDisclaimer(studentId: string): Observable<UserDisclaimer> {
    return this.http.get<UserDisclaimer>(`${this.backendBaseUrl}/api/v1/user/${studentId}/disclaimer`);
  }
}
