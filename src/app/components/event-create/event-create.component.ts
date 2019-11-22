/**
 * @author Andreas Gøricke, s153804
 */

import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { EventService } from '../../_services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})

export class EventCreateComponent {
  title:string;
  description:string;
  speakers:string;
  date:string;
  time:string;
  duration:number;

  constructor( private service: EventService, private toastrService: NbToastrService) { }


  submit() {
      const eventToCreate = {
        title: this.title,
        description: this.description,
        date: this.date,
        durationInHours: this.duration,
        durationApproximated: false,
        speakers: this.speakers
      };

      this.service.createEvent(eventToCreate).subscribe(

      );

  }

  showWarningToast(position, status, message) {
    this.toastrService.show(
      status || 'Warning',
      message,
      { position, status });
  }

}

