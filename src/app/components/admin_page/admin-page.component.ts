/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/login/user.model';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AdminState } from 'src/app/_states/admin.state';
import { GetUsers } from 'src/app/_actions/admin.actions';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  users: any;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetUsers()).subscribe(x => {
      this.users = x;
      console.log(this.users);
    });
  }

}
