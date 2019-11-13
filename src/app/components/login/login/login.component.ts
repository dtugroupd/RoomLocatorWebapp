import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User, Token } from 'src/app/models/login/user.model';
import { TokenState } from 'src/app/_states/token.state';

@Component({
  selector: 'app-login',
  template: `User signed in: {{ user$ | async | json }}`,
  styles: ['span { color: green;' ]
})

export class LoginComponent {
  
  @Select(TokenState.getToken) token$: Observable<string>;
  @Select(TokenState.getUser) user$: Observable<User>;

  constructor() { }
}
