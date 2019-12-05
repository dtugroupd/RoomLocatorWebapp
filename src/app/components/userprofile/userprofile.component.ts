/**
 * @author Hamed kadkhodaie, s083485
 */

import { Component, OnInit } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { User } from "src/app/models/login/user.model";
import { Observable } from "rxjs";
import { Store, Select } from "@ngxs/store";
import { TokenState } from "src/app/_states/token.state";
import { Logout } from "src/app/_actions/token.actions";
import { UserDeleteMeComponent } from "../user-delete-me/user-delete-me.component";

@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  user: User;
  base64Image: string;
  @Select(TokenState.getUser) user$: Observable<User>;

  constructor(private store: Store, private dialogService: NbDialogService) {
    this.user$.subscribe(x => {
      this.user = x;
    });
  }

  ngOnInit() {
    this.base64Image = `data:image/png;base64,${this.user.profileImage}`;
  }

  confirmDeletion(u: User) {
    const userContext = { user: u };
    const settings = {
      autoFocus: false,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      context: userContext
    };

    this.dialogService
      .open(UserDeleteMeComponent, settings)
      .onClose.subscribe(del => {
        if (del) {
          this.store.dispatch(new Logout());
        }
      });
  }

  getUserRolesAsString() {
    return this.user.roles.map(x => [x.name]).join(', ');
  }
}
