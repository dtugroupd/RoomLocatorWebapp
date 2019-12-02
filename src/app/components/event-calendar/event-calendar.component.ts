/**
 * @author Andreas Gøricke, s153804
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt as faCalendarAltReg} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EventCalendarComponent {
  faCalendarAltReg = faCalendarAltReg;
}
