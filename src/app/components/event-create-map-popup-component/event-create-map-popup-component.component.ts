import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EventCreateComponent } from '../event-create/event-create.component';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { AddEventSuccess, AddEventError } from 'src/app/_actions/event.actions';
import { MapLocation } from 'src/app/models/mazemap/map-location.model';

@Component({
  selector: 'app-event-create-map-popup-component',
  templateUrl: './event-create-map-popup-component.component.html',
  styleUrls: ['./event-create-map-popup-component.component.scss']
})
export class EventCreateMapPopupComponentComponent
  implements OnInit, OnDestroy {
  lngLat: any;
  location: MapLocation;
  zLevel: number;

  constructor(
    private dialogService: NbDialogService,
    private action$: Actions,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.action$
      .pipe(untilComponentDestroyed(this), ofActionDispatched(AddEventSuccess))
      .subscribe(() => {
        this.showSuccessToast('top-right', 'success', 'Dit event er oprettet.');
      });

    this.action$
      .pipe(untilComponentDestroyed(this), ofActionDispatched(AddEventError))
      .subscribe(() => {
        this.showSuccessToast(
          'top-right',
          'danger',
          'Dit event kunne ikke oprettes. Prøv igen.'
        );
      });
  }

  ngOnDestroy() {}

  openDialog() {
    const settings = {
      autoFocus: false,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      context: { lngLat: this.lngLat, location: this.location, zLevel: this.zLevel }
    };

    this.dialogService.open(EventCreateComponent, settings);
  }

  showSuccessToast(position, status, message) {
    this.toastrService.show(status, message, { position, status });
  }

  showErrorToast(position, status, message) {
    this.toastrService.show(status, message, { position, status });
  }
}
