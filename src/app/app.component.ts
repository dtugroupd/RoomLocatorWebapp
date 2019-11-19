/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s165242
 * @author Andreas Gøricke, s153804
 */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { SetActivateFeedbackAndStatus } from './_actions/mazemap.actions';
import { MazemapState } from './_states/mazemap.state';
import { Observable } from 'rxjs';
import { GetSurveys } from './_actions/survey.actions';
import { LibrarySection } from './models/mazemap/library-section.model';
import { faMap, faCalendarAlt, faPoll } from '@fortawesome/free-solid-svg-icons';
import { NbMenuItem, NbThemeService } from '@nebular/theme';
import { TokenState } from './_states/token.state';
import { User } from './models/login/user.model';
import { AuthService } from './_services/auth.service';
import { map, tap } from 'rxjs/operators';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('toggleMobileMenu', [
      state('show', style({
        width: '80%',
        opacity: 1,
      })),
      state('hide', style({
        width: '0px',
        opacity: 0.0,
      })),
      transition('show => hide', [
        animate('0.15s ease-in-out')
      ]),
      transition('hide => show', [
        animate('0.15s ease-in-out')
      ]),
    ]),
  ]
})

export class AppComponent implements OnInit {
  title = 'RoomLocatorWebapp';
  activeSection: LibrarySection;
  faPoll = faPoll;
  faCalendarAlt = faCalendarAlt;
  faMap = faMap;
  mobileMenuToggled = false;
  faBars = faBars;

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

  userHasAccess(link: string): Observable<boolean> {
    switch (link) {
      case '/':
        return new Observable((observer: any) => observer.next(true));
      case '/mazemap':
        return new Observable((observer: any) => observer.next(true));
      case '/calendar':
        return new Observable((observer: any) => observer.next(true));
      case '/survey-management':
        return this.userHasRole(['library', 'researcher']).pipe(tap(val => val));
      default:
        return new Observable((observer: any) => observer.next(false));
    }
  }

  userHasRole(roles: string[]): Observable<boolean> {
    return this.user$.pipe(map(user => {
      if (user && user.roles) {
        return roles.filter(role => user.roles.includes(role)).length !== 0;
      }

      return false;
    }));
  }

  toggleMobileMenu() {
    this.mobileMenuToggled = !this.mobileMenuToggled;
    console.log(this.mobileMenuToggled);
  }

  hideMobileMenu() {
    this.mobileMenuToggled = false;
  }
}
