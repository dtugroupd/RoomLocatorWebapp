import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { Router} from "@angular/router"

/**
 * @author Anders Wiberg Olsen, s165241
 * @author Hadi Horani, s144885
 */
@Component({
  selector: 'app-validate',
  template: '',
  styles: []
})
export class ValidateComponent implements OnInit, OnDestroy {
  apiUrl: string;
  prod: boolean;

  token: string;
  jwt: any;

  subscriptions: Subscription;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {
    this.apiUrl = environment.backendUrl;
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
        this.token = JSON.parse(atob(params['token']));

        this.jwt = JSON.parse(atob(this.token.split('.')[1]));
      }));
  }

  ngOnInit() {
    localStorage.setItem("token", this.token);
    this.router.navigate(["/"]);
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
