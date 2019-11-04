import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { User } from 'src/app/models/login/user.model';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/states/user.state';

@Component({
  selector: 'app-roles-view',
  template: `
  <div>
  <div>
  Available User Roles: Admin, Researcher, Student
      </div>
    <div>
        Granted User Roles:
        <span *ngFor = "let roles of roles.tokenValue.User.Roles">
       {{ roles }}
       </span>
    </div>
  </div>
  `
})

export class RolesViewComponent implements OnInit {

  @Select(UserState.getUser) user$: Observable<User>;
  roles: any;

  constructor(private store: Store) {
   }

  ngOnInit() {
    this.user$.subscribe(result => {
      this.roles = result;
    });
  }

}
