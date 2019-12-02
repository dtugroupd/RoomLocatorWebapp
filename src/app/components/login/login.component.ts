import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/_actions/token.actions';
import { LoginModel } from 'src/app/models/login/user.model';

/**
 * @author Anders Wiberg Olsen, s165241
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onSubmit() {

    const login: LoginModel =
    {
      username: this.username,
      password: this.password
    };
    this.store.dispatch(new Login(login));
  }

}
