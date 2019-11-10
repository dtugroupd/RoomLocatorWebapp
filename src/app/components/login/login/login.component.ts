import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Token } from 'src/app/models/login/user.model';
import { UserState } from 'src/app/_states/user.state';

@Component({
  selector: 'app-login',
  template: ``,
  styles: ['span { color: green;' ]
})

export class LoginComponent implements OnInit {
  serviceUrl: string;
   token: Token;

  @Select(UserState.getToken) token$: Observable<Token>;


  constructor(private store: Store) {
   this.serviceUrl = `${environment.backendUrl}/api/v1/auth/validate`;
   //serviceUrl doesn't work
   window.location.href = 'https://auth.dtu.dk/dtu/?service=https://localhost:5001/api/v1/auth/validate';
  }

  ngOnInit() {
  }
}
