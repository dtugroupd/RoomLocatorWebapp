/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Token } from 'src/app/models/login/user.model';
import { TokenState } from 'src/app/_states/token.state';

@Component({
  selector: 'app-login-button',
  template: `    User signed in: {{ token.user.studentId }}
  `,
  styles: ['span { color: green;' ]
})
export class LoginButtonComponent implements OnInit {
  serviceUrl: string;
   token: Token;
   user: User;

  @Select(TokenState.getToken) token$: Observable<Token>;

  constructor(private store: Store) {
   this.serviceUrl = `${environment.backendUrl}/api/v1/auth/validate`;
  }

  ngOnInit() {
    this.token$.subscribe(result => {
      this.token = result;
    });
  }
}
