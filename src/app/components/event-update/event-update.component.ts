/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';
import { UpdateEvent } from 'src/app/_actions/event.actions';
import { Event } from '../../models/calendar/event.model';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.scss']
})
export class EventUpdateComponent implements OnInit {

  event: Event;
  date = null;
  time = '';

  constructor(private store: Store, private dialogRef: NbDialogRef<any>) {
   }

  ngOnInit() {
    const standardDate = moment(this.event.date).toDate();
    this.date = standardDate;
    this.time = moment(this.event.date).format('HH:mm');
  }

  submit() {
    const eventToUpdate = {
      id: this.event.id,
      title: this.event.title,
      description: this.event.description,
      date: moment(this.event.date).format('YYYY-MM-DD') + 'T' + this.time + ':00',
      durationInHours: this.event.durationInHours,
      durationApproximated: false,
      speakers: this.event.speakers
    };

    this.store.dispatch(new UpdateEvent(eventToUpdate));
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
