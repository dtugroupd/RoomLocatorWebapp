/**
 * @author Andreas Gøricke, s153804
 * @author Thomas Lien Christensen, s165242
 */

import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';
import { Store } from '@ngxs/store';
import { AddEvent } from 'src/app/_actions/event.actions';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})

export class EventCreateComponent {
  title: string;
  description: string;
  speakers: string;
  date: string;
  time: string;
  duration: number;
  moment = moment;

  constructor(private store: Store, private dialogRef: NbDialogRef<any>) { }

  submit() {
    const eventToCreate = {
      title: this.title,
      description: this.description,
      date: moment(this.date).format('YYYY-MM-DD') + 'T' + this.time + ':00',
      durationInHours: this.duration,
      durationApproximated: false,
      speakers: this.speakers
    };

    this.store.dispatch(new AddEvent(eventToCreate));
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}

