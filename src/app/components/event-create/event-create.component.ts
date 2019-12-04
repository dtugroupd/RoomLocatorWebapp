/**
 * @author Andreas Gøricke, s153804
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';
import { Store } from '@ngxs/store';
import { AddEvent } from 'src/app/_actions/event.actions';
import { MapLocation } from 'src/app/models/mazemap/map-location.model';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})

export class EventCreateComponent {
  lngLat: any;
  location: MapLocation;
  zLevel: number;
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
      locationId: this.location.id,
      longitude: this.lngLat.lng,
      latitude: this.lngLat.lat,
      zLevel: this.zLevel,
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

