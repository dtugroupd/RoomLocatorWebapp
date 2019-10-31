import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetCoordinates, GetLibrarySections, SetActivateFeedbackAndStatus } from './actions/mazemap.action';
import { Mazemap, LibrarySection } from './models/mazemap.model';
import { MazemapState } from './states/mazemap.state';
import { Observable } from 'rxjs';
import { GetSurveys } from './actions/survey.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'RoomLocatorWebapp';
  activeSection: LibrarySection;

  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;
  @Select(MazemapState.getCoordinatesSet) coordinates$: Observable<Mazemap[]>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetCoordinates());
    this.activeSection$.subscribe(x => {
      this.activeSection = x;
    });

    this.store.dispatch(new GetSurveys());

    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        switch (x.urlAfterRedirects) {
          case '/mazemap':
            this.store.dispatch(new SetActivateFeedbackAndStatus(true));
            break;
          default:
            break;
        }
      }
    });


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
