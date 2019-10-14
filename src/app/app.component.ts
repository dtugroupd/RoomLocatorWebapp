import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetCoordinates } from './actions/mazemap.action';
import { Mazemap } from './models/mazemap.model';
import { MazemapState } from './states/mazemap.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RoomLocatorWebapp';

  @Select(MazemapState.getCoordinatesSet) coordinates$: Observable<Mazemap[]>

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetCoordinates()).subscribe(result => {
     this.coordinates$ = result;
    });
  }
}
