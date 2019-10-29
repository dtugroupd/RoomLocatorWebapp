import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt as faCalendarAltReg} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CalendarviewComponent {
  faCalendarAltReg = faCalendarAltReg;

}