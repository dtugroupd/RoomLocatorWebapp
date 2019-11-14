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
import { NbMenuItem, NbThemeService } from '@nebular/theme';
import { TokenState } from './_states/token.state';
import { User } from './models/login/user.model';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'RoomLocatorWebapp';
  activeSection: LibrarySection;

  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;
  @Select(TokenState.getUser) user$: Observable<User>;

  constructor(private store: Store, private router: Router, private themeService: NbThemeService, private authService: AuthService) {
    // this.themeService.changeTheme('cosmic')
  }

  menuItems: NbMenuItem[] = [
    {
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Mazemap',
      'link': '/mazemap'
    },
    {
      'title': 'Calendar',
      'link': '/calendar',
    },
    {
      'title': 'Manage Surveys',
      'link': '/survey-management'
    }
  ];

  ngOnInit() {
    this.authService.authenticate();
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
