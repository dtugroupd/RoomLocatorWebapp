import { Component, OnInit } from '@angular/core';
import { SignalRServiceService } from 'src/app/_services/signal-rservice.service';
import { HubConnectionState } from '@microsoft/signalr';
import { Select } from '@ngxs/store';
import { SocketState } from 'src/app/_states/socket.state';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-socket-status',
  templateUrl: './socket-status.component.html',
  styleUrls: ['./socket-status.component.scss']
})
export class SocketStatusComponent implements OnInit {
  hubState: HubConnectionState;

  @Select(SocketState.status) socketStatus$: Observable<string>;
  @Select(SocketState.isConnecting) isConnecting$: Observable<boolean>;

  constructor(private socketService: SignalRServiceService, private toasterService: NbToastrService) { }

  ngOnInit() {
  }

  stateChanged() {
    console.warn("reconnecting");
  }
}
