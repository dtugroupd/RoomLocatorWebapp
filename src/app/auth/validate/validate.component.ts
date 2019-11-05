import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetUser } from 'src/app/_actions/login.actions';

@Component({
  selector: 'app-validate',
  template: `
    <p>Logged in as {{jwt.sub}} {{register}} {{jwt.exp}}</p>
    <p>Is Expired: {{expired}} (expires: {{expiration | date:"short"}}) </p>
    <pre>{{jwt | json}}</pre>
    <pre>{{token | json}}</pre>
  `,
  styles: []
})
export class ValidateComponent implements OnInit, OnDestroy {
  apiUrl: string;
  prod: boolean;

  token: any;
  jwt: any;

  subscriptions: Subscription;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.apiUrl = environment.backendUrl;
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
      this.token = JSON.parse(atob(params['token']));
     // console.log(this.token)

      this.jwt = JSON.parse(atob(this.token.Token.split('.')[1]));
    }));
  }

  ngOnInit() {
    // this.validateLogin().then(x => this.jwt = x);
    this.store.dispatch(new SetUser({tokenValue: this.token}));
  }

  get register(): boolean {
    return this.jwt.RegisterUser;
  }

  get expired(): boolean {
    return Date.now() >= this.jwt.exp * 1000;
  }
  get expiration(): Date {
    return new Date(this.jwt.exp * 1000);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe;
  }
}
