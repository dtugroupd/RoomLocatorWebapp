/**
 * @author Andreas Gøricke, s153804
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faCalendarAlt as faCalendarAltReg} from '@fortawesome/free-regular-svg-icons';
import { EventService } from '../../_services/event.service';
import { Observable } from 'rxjs';
import { EventState } from 'src/app/_states/event.state';
import { Select, Store } from '@ngxs/store';
import { GetEvents } from 'src/app/_actions/event.actions';
import { Event } from '../../models/calendar/event.model'
import * as moment from 'moment';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EventCalendarComponent {
  moment = moment;
  faCalendarAltReg = faCalendarAltReg;
  events: Event[];
  constructor( private service: EventService, private store: Store) { }

  @Select(EventState.getEvents) events$: Observable<Event[]>;

  ngOnInit() {
    this.store.dispatch(new GetEvents());

    this.events$.subscribe(x => {
      this.events = x;
    });
  }

}
