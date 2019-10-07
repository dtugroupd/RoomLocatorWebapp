import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetTokenValue } from './actions/login.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RoomLocatorWebapp';

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetTokenValue());
  }
}
