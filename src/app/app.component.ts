/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s165242
 * @author Andreas Gøricke, s153804
 * @author Anders Wiberg Olsen, s165241
 * @author Amal Qasim, s132957
 * @author Hamed kadkhodaie, s083485
 */

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { SetActivateFeedbackAndStatus } from './_actions/mazemap.actions';
import { MazemapState } from './_states/mazemap.state';
import { Section } from './models/mazemap/section.model';
import { Observable, Subscription } from 'rxjs';
import { GetSurveys } from './_actions/mazemap.actions';
import { NbMenuItem, NbThemeService,NB_WINDOW,NbMenuService } from '@nebular/theme';
import { TokenState } from './_states/token.state';
import { User, Role } from './models/login/user.model';
import { map, tap, filter } from 'rxjs/operators';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GetCurrentFeedback } from './_actions/feedback.actions';
import { SetTokenAndUser, Logout } from './_actions/token.actions';
import { Token } from '@angular/compiler';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { SignalRServiceService } from './_services/signal-rservice.service';


@Component({
  selector: 'app-root, nb-context-menu-click',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
  :host nb-layout-header ::ng-deep nav {
    justify-content: flex-end;
  }
`],
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

export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  browserRefresh: any;
  currentUser: User;
  currentToken: Token;

  constructor(private store: Store, private router: Router, private themeService: NbThemeService,
    private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window, private signalRService: SignalRServiceService) {
    const preferredTheme = localStorage.getItem("theme");
    if (preferredTheme) {
      this.selectedTheme = preferredTheme;
      this.themeService.changeTheme(preferredTheme);
    }

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;

        if (this.browserRefresh) {
          this.store.dispatch(new SetTokenAndUser());
        }
      }
    });
  }
  title = 'RoomLocatorWebapp';
  activeSection: Section;
  mobileMenuToggled = false;
  isLocationActive = false;
  faBars = faBars;
  base64Image: string = "";
  selectedTheme = 'default';
  themes = ["Default", "Dark", "Cosmic"];

  @Select(MazemapState.getActiveSection) activeSection$: Observable<Section>;
  @Select(TokenState.getUser) user$: Observable<User>;
  @Select(TokenState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(TokenState.getToken) token$: Observable<string>;
  @Select(MazemapState.getActivateFeedbackAndStatus) viewIsMazemap$: Observable<boolean>;

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  menuItems: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Calendar',
      link: '/calendar',
    },
    {
      title: 'Manage Surveys',
      link: '/survey-management'
    },
    {
      title: 'Admin Page',
      link: '/admin'
    }

  ];


  changeTheme(newTheme: string): void {
    this.selectedTheme = newTheme.toLowerCase();
    localStorage.setItem('theme', this.selectedTheme);
    this.themeService.changeTheme(this.selectedTheme);
  }

  ngOnInit() {
    this.activeSection$.subscribe(x => {
      this.activeSection = x;
    });

    this.user$.subscribe(x => {
      if (x) {
        this.base64Image = `data:image/png;base64,${x.profileImage}`;
      }
    });

    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        switch (x.urlAfterRedirects) {
          case '/':
            this.store.dispatch(new SetActivateFeedbackAndStatus(true));
            break;
          default:
            break;
        }
      }
    });

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {

        if ( title === 'Logout' )
        {
          this.store.dispatch( new Logout() );
        } 

        if (title === 'Profile'){
          this.router.navigate(['/userprofile']);  
        }
      });

    this.token$.subscribe(token => {
      if (!token) { return; }

      this.signalRService.start(token);      
    });
    console.error("after the subbing")
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  userHasAccess(link: string): Observable<boolean> {
    switch (link) {
      case '/':
        return new Observable((observer: any) => observer.next(true));
      case '/calendar':
        return new Observable((observer: any) => observer.next(true));
      case '/admin':
        return this.user$.pipe(map(user => {
          if (user) {
            return user.isGeneralAdmin;
          }
          return false;
        }));
      case '/survey-management':
        return this.userHasRole( [ 'researcher', 'admin' ] ).pipe( tap( val => val ) );
      default:
        return new Observable( ( observer: any ) => observer.next( false ) );
        
    }
  }

  userHasRole(roles: string[]): Observable<boolean> {
    return this.user$.pipe( map( user => {
      if (user && user.roles) {
        const userRoleNames = user.roles.map(r => r.name);
        return roles.filter(role => userRoleNames.includes( role ) ).length !== 0;
      }

      return false;
    }));
  }

  toggleMobileMenu() {
    this.mobileMenuToggled = !this.mobileMenuToggled;
  }

  hideMobileMenu() {
    this.mobileMenuToggled = false;
  }
}
