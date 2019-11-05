/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { SetActivateFeedbackAndStatus } from './_actions/mazemap.actions';
import { MazemapState } from './_states/mazemap.state';
import { Observable } from 'rxjs';
import { GetSurveys } from './_actions/survey.actions';
import { LibrarySection } from './models/mazemap/library-section.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'RoomLocatorWebapp';
  activeSection: LibrarySection;

  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
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
  }
}
