import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Token } from 'src/app/models/login/user.model';
import { UserState } from 'src/app/_states/user.state';

@Component({
  selector: 'app-login',
  template: `User signed in: {{ token.user.studentId }}
  `,
  styles: ['span { color: green;' ]
})

export class LoginComponent implements OnInit {
  
  token: Token;

  @Select(UserState.getToken) token$: Observable<Token>;
  
  constructor() {
   window.location.href = 'https://auth.dtu.dk/dtu/?service=https://localhost:5001/api/v1/auth/validate';
  }

  ngOnInit() {
    this.token$.subscribe(result => {
      this.token = result;
    });
  }
}
