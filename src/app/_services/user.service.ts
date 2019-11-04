/**
 * @author Hadi Horani, s144885
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/login/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor() {}

    fetchUser() {
        //return this.http.get<User>(`${environment.backendUrl}/api/v1/auth/validate`);
    }
}