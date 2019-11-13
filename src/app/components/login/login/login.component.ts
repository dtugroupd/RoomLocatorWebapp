/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/login/user.model';
import { TokenState } from 'src/app/_states/token.state';

@Component({
  selector: 'app-login',
  template: `User signed in: {{ token.user.studentId }}
  `,
  styles: ['span { color: green;' ]
})

export class LoginComponent implements OnInit {
  
  token: Token;

  @Select(TokenState.getToken) token$: Observable<Token>;
  
  constructor() {
 //  window.location.href = 'https://auth.dtu.dk/dtu/?service=https://localhost:5001/api/v1/auth/validate';
  }

  ngOnInit() {
    this.token$.subscribe(result => {
      this.token = result;
    });
  }
}
