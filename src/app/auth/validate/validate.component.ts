import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddToken } from 'src/app/actions/login.action';

@Component({
  selector: 'app-validate',
  template: `
    <p>Logged in as {{jwt.sub}} {{register}} {{jwt.exp}}</p>
    <p>Is Expired: {{expired}} (expires: {{expiration | date:"short"}}) </p>
    <pre>{{jwt | json}}</pre>
    <pre>{{token}}</pre>
  `,
  styles: []
})
export class ValidateComponent implements OnInit, OnDestroy {
  apiUrl: string;
  prod: boolean;

  ticket: string;
  token: string;
  studentId: string;
  jwt: any;

  subscriptions: Subscription;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.apiUrl = environment.backendUrl;
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
      this.ticket = params['ticket'];
      this.token = params['token'];

      this.jwt = JSON.parse(atob(this.token.split('.')[1]));
    }));
  }

  ngOnInit() {
    this.store.dispatch(new AddToken({tokenValue: this.token}));
    localStorage.setItem('token', this.token);
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

  async validateLogin()
  {
    const response = await fetch(`${environment.backendUrl}/api/v1/auth/validate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ticket: this.ticket })
    });

    const content = await response.json();
    return content;
  }

}
