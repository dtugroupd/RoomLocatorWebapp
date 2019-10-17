import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetCoordinates, GetLibrarySections } from './actions/mazemap.action';
import { Mazemap, LibrarySection } from './models/mazemap.model';
import { MazemapState } from './states/mazemap.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'RoomLocatorWebapp';

  @Select(MazemapState.getCoordinatesSet) coordinates$: Observable<Mazemap[]>;
  @Select(MazemapState.getLibrarySections) librarySections$: Observable<LibrarySection[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetLibrarySections());
    this.store.dispatch(new GetCoordinates());

      /* In case we HAVE to subscribe/unsubsribe

    .subscribe(yo => {
      this.coordinates$.subscribe(yoo => {
        console.log('Look at me now ', yoo);
        this.coordinates = yoo;
      });

     this.coordinates$ = yo;
    });
      */
  }
}
