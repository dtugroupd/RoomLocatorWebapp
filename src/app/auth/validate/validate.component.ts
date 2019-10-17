import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validate',
  template: `
    <p>Logged in as {{studentId}}</p>
  `,
  styles: []
})
export class ValidateComponent implements OnInit, OnDestroy {
  apiUrl: string;
  prod: boolean;

  ticket: string;
  studentId: string;
  jwt: {};

  subscriptions: Subscription;

  constructor(private route: ActivatedRoute) {
    this.apiUrl = environment.backendUrl;
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
      this.ticket = params['ticket'];
      this.studentId = params['userId'];
    }));
  }

  ngOnInit() {
    // this.validateLogin().then(x => this.jwt = x);
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
