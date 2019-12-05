/**
 * @author Thomas Lien Christensen, s165242
 * @author Andreas Gøricke, s153804
 */

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { faCalendarAlt as faCalendarAltReg, faEdit, faClock } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { EventState } from 'src/app/_states/event.state';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { GetEvents, AddEventSuccess, AddEventError, UpdateEventSuccess, UpdateEventError, DeleteEvent, DeleteEventSuccess, DeleteEventError } from 'src/app/_actions/event.actions';
import { Event } from '../../models/calendar/event.model';
import * as moment from 'moment';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventUpdateComponent } from '../event-update/event-update.component';
import { TokenState } from 'src/app/_states/token.state';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Role, User } from 'src/app/models/login/user.model';
import { map } from 'rxjs/operators';

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
  faTrash = faTrash;
  events: Event[];

  user: User = null;
  userAdminLocations: Role[] = null;

  constructor(
    private store: Store,
    private action$: Actions,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  @Select(EventState.getEvents) events$: Observable<Event[]>;
  @Select(TokenState.userIsAdmin) userIsAdmin$: Observable<boolean>;
  @Select(TokenState.getUser) user$: Observable<User>;
  @Select(TokenState.getUserAdminLocations) userAdminLocations$: Observable<Role[]>

  ngOnInit() {
    this.store.dispatch(new GetEvents());

    this.events$.subscribe(x => {
      this.events = x;
    });

    this.user$.subscribe(x => {
      this.user = x;
    });

    this.userAdminLocations$.subscribe(x => {
      this.userAdminLocations = x;
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(AddEventSuccess)).subscribe(() => {
      this.showToast('top-right', 'success', 'The event has been created.');
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(UpdateEventSuccess)).subscribe(() => {
      this.showToast('top-right', 'success', 'Saved changes.');
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(AddEventError)).subscribe(() => {
      this.showToast('top-right', 'danger', 'The event could not be created.');
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(UpdateEventError)).subscribe(() => {
      this.showToast('top-right', 'danger', 'Could not save changes.');
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(DeleteEventSuccess)).subscribe(() => {
      this.showToast('top-right', 'success', 'The event has been deleted.');
    });

    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(DeleteEventError)).subscribe(() => {
      this.showToast('top-right', 'danger', 'The event could not be deleted.');
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

  userHasAdminPermissions(locationId: string) {
    let adminPermissionLocation: string[];

    if (this.userAdminLocations) {
      adminPermissionLocation = this.userAdminLocations.map(x => x.locationId);
    }

    if (this.user) {
      return this.user.isGeneralAdmin || adminPermissionLocation.includes(locationId);
    }

    return false;
  }

  deleteEvent(event: Event) {
    this.store.dispatch(new DeleteEvent(event.id));
  }

  showToast(position, status, message) {
    this.toastrService.show(status, message, { position, status });
  }

}
