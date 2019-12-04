/**
 * @author Thomas Lien Christensen, s165242
 * @author Andreas Gøricke, s153804
 */

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { faCalendarAlt as faCalendarAltReg, faEdit, faClock } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { EventState } from 'src/app/_states/event.state';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { GetEvents, AddEventSuccess, AddEventError, UpdateEventSuccess, UpdateEventError } from 'src/app/_actions/event.actions';
import { Event } from '../../models/calendar/event.model';
import * as moment from 'moment';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventUpdateComponent } from '../event-update/event-update.component';
import { TokenState } from 'src/app/_states/token.state';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EventCalendarComponent implements OnInit, OnDestroy {
  moment = moment;
  faCalendarAltReg = faCalendarAltReg;
  faEdit = faEdit;
  faMarker = faMapMarkerAlt;
  faClock = faClock;
  events: Event[];

  constructor(
    private store: Store,
    private action$: Actions,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  @Select(EventState.getEvents) events$: Observable<Event[]>;
  @Select(TokenState.userIsAdmin) userIsAdmin$: Observable<boolean>;

  ngOnInit() {
    this.store.dispatch(new GetEvents());

    this.events$.subscribe(x => {
      this.events = x;
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(AddEventSuccess)).subscribe(() => {
      this.showSuccessToast('top-right', 'success', 'Dit event er oprettet.');
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(UpdateEventSuccess)).subscribe(() => {
      this.showSuccessToast('top-right', 'success', 'Eventet er opdateret.');
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(AddEventError)).subscribe(() => {
      this.showSuccessToast('top-right', 'danger', 'Dit event kunne ikke oprettes. Prøv igen.');
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(UpdateEventError)).subscribe(() => {
      this.showSuccessToast('top-right', 'danger', 'Eventet kunne ikke opdateres. Prøv igen.');
    });
  }

  ngOnDestroy() { }

  fitToLength(chars: number, text: string) {
    if (text.length > chars) {
      return text.substring(0, chars) + '...';
    }

    return text;
  }
  openCreateEventDialog() {
    const settings = {
      autoFocus: false,
      closeOnBackdropClick: true,
      closeOnEsc: true
    };

    this.dialogService.open(EventCreateComponent, settings);
  }

  openEditEventDialog(event: Event) {
    const context = { event };
    const settings = {
      autoFocus: false,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      context
    };
    this.dialogService.open(EventUpdateComponent, settings);
  }

  showSuccessToast(position, status, message) {
    this.toastrService.show(status, message, { position, status });
  }

  showErrorToast(position, status, message) {
    this.toastrService.show(status, message, { position, status });
  }
}
