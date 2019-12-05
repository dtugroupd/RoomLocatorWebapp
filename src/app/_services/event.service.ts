/**
 * @author Andreas Gøricke, s153804
 * @author Thomas Lien Christensen, s165242
 */

import { Injectable } from '@angular/core';
import { EventToCreate } from '../models/calendar/event-to-create.model';
import { Event, EventToDelete } from '../models/calendar/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { EventToUpdate } from '../models/calendar/event-to-update.model';

@Injectable({
    providedIn: 'root'
  })

  export class EventService extends BaseService {

    constructor(http: HttpClient) {
      super(http);
    }

createEvent(event: EventToCreate) {
    const options = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
      })
    };

    return this.http.post<Event>(`${this.backendBaseUrl}/api/v1/event/create`, event, options);
  }

  updateEvent(event: EventToUpdate) {
    return this.http.put<Event>(`${this.backendBaseUrl}/api/v1/event/update`, event);
  }

  deleteEvent(event: EventToDelete) {
    return this.http.delete<any>(`${this.backendBaseUrl}/api/v1/event/${event.id}`);
  }

  getAll() {
    return this.http.get<Event[]>(`${this.backendBaseUrl}/api/v1/event/getall`);
  }
}