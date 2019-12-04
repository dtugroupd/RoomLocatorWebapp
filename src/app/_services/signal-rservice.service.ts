import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {
  public message: string;
  public connection: HubConnection;

  constructor() { }

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
  }
}
