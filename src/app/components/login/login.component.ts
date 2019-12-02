import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Login } from 'src/app/_actions/token.actions';
import { LoginModel, UserDisclaimer } from 'src/app/models/login/user.model';
import { SetAcceptedDisclaimer } from 'src/app/_actions/user.actions';
import { UserDisclaimerState } from 'src/app/_states/user.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenState } from 'src/app/_states/token.state';
import { ErrorModel } from 'src/app/models/general/error.model';
import { NbToastrService } from '@nebular/theme';

/**
 * @author Anders Wiberg Olsen, s165241
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(UserDisclaimerState.hasAcceptedDisclaimer) hasAcceptedDisclaimer$: Observable<boolean>;
  @Select(TokenState.loginIsLoading) loginLoading$: Observable<boolean>;
  @Select(TokenState.getError) loginError$: Observable<ErrorModel>;

  username: string;
  password: string;
  acceptedDisclaimer?: boolean = null;

  disclaimerLoading = false;
  loginLoading = false;

  constructor(private store: Store, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.hasAcceptedDisclaimer$.subscribe(disclaimer => {
      this.acceptedDisclaimer = disclaimer;
    });
    this.loginError$.subscribe(error => {
      if(error){
        this.toastrService.danger(error.message, error.title);
      }
    });
  }

  acceptDisclaimer(accepted: boolean) {
    this.acceptedDisclaimer = accepted;
  }

  usernameLostFocus() {
    this.store.dispatch(new SetAcceptedDisclaimer(this.username));
  }

  onSubmit() {
    const login: LoginModel =
    {
      username: this.username,
      password: this.password,
      hasAcceptedDisclaimer: this.acceptedDisclaimer
    };
    this.store.dispatch(new Login(login));
  }
}
