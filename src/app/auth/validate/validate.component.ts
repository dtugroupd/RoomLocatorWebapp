/**
 * @author Anders Wiberg Olsen, s165241
 * @author Hadi Horani, s144885
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetUser } from 'src/app/_actions/user.actions';
import { User } from 'src/app/models/login/user.model';

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

  user: User;
  jwt: any;

  subscriptions: Subscription;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.apiUrl = environment.backendUrl;
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
      this.user = JSON.parse(atob(params['token']));

      this.jwt = JSON.parse(atob(this.user.token.split('.')[1]));
    }));
  }

  ngOnInit() {
    this.store.dispatch(new SetUser(this.user));
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
