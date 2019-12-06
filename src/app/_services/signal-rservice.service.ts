import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Store, Select } from '@ngxs/store';
import { GetUsersSuccess, GetUsers } from '../_actions/admin.actions';
import { TokenState } from '../_states/token.state';
import { Observable } from 'rxjs';
import { User } from '../models/login/user.model';
import { Logout, FetchUserSuccess } from '../_actions/token.actions';
import { GetEvents } from '../_actions/event.actions';
import { NbToastrService } from '@nebular/theme';
import { environment } from 'src/environments/environment';
import { SocketConnected, SocketConnecting } from '../_actions/socket.actions';

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
      .withUrl(`${environment.backendUrl}/api/socket`, { accessTokenFactory: () => token })
      .withAutomaticReconnect([1000, 1000, 2000, 2000, 5000, 5000, 10000, 10000, 300000])
      .build();
      this.connection.start().then(() => {
        console.info("Connected using SignalR");
        this.store.dispatch(new SocketConnected(this.connection.connectionId));
      }).catch(err => console.error(`SignalR Connection failed with ${err}`));

      this.connection.on('message', x => console.log(`Received Message:`, x));
      this.listenUserChanges();
      this.listenEventChanges();
      this.connection.onreconnected(() => this.store.dispatch(new SocketConnected(this.connection.connectionId)));
      this.connection.onreconnecting(() => this.store.dispatch(new SocketConnecting()));
      this.connection.onclose(() => console.warn("closing connection"))
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
    this.connection.on('updated-user', user => this.store.dispatch(new FetchUserSuccess(user)));
  }

  private listenEventChanges() {
    this.connection.on('events-changed', () => this.store.dispatch(new GetEvents()));
    this.connection.on('new-event', event => this.toaster.info(`A new event was added at ${event.locationName}: ${event.title}`, "New Event!", { duration: 10000 }));
  }
}
