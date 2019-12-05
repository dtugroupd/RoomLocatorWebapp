import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Store, Select } from '@ngxs/store';
import { GetUsersSuccess, GetUsers } from '../_actions/admin.actions';
import { TokenState } from '../_states/token.state';
import { Observable } from 'rxjs';
import { User } from '../models/login/user.model';
import { Logout } from '../_actions/token.actions';
import { GetEvents } from '../_actions/event.actions';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {
  @Select(TokenState.getUser) user$: Observable<User>;
  public message: string;
  public connection: HubConnection;
  private userId: string;

  constructor(private store: Store, private toaster: NbToastrService) {
    this.user$.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  public start(token: string) {
    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withUrl(`https://localhost:5001/api/socket`, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();
      this.connection.start().then(() => {
        console.info("Connected using SignalR");
      }).catch(err => console.error(`SignalR Connection failed with ${err}`));

      this.connection.on('message', x => console.log(`Received Message:`, x));
      this.listenUserChanges();
      this.listenEventChanges();
  }

  private listenUserChanges() {
    this.connection.on('admin-user-update', users => {
      this.store.dispatch(new GetUsersSuccess(users));
    });
    this.connection.on('deleted-user', deletedUserId => {
      if (deletedUserId == this.userId) {
        this.store.dispatch(new Logout());
      } else {
        this.store.dispatch(new GetUsers());
      }
    });
    this.connection.on('created-user', user => this.store.dispatch(new GetUsers()));
  }

  private listenEventChanges() {
    this.connection.on('events-changed', () => this.store.dispatch(new GetEvents()));
    this.connection.on('new-event', event => this.toaster.info(`A new event was added at ${event.locationName}: ${event.title}`, "New Event!", { duration: 10000 }));
  }
}
