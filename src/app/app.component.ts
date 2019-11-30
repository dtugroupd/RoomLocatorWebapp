/**
 * @author Thomas Lien Christensen, s165242
 * @author Anders Wiberg Olsen, s165241
 */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { SetActivateFeedbackAndStatus } from './_actions/mazemap.actions';
import { MazemapState } from './_states/mazemap.state';
import { Observable } from 'rxjs';
import { GetSurveys } from './_actions/mazemap.actions';
import { LibrarySection } from './models/mazemap/library-section.model';
import { NbMenuItem, NbThemeService } from '@nebular/theme';
import { TokenState } from './_states/token.state';
import { User } from './models/login/user.model';
import { map, tap } from 'rxjs/operators';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  animations: [
    trigger( 'toggleMobileMenu', [
      state( 'show', style( {
        width: '80%',
        opacity: 1,
      } ) ),
      state( 'hide', style( {
        width: '0px',
        opacity: 0.0,
      } ) ),
      transition( 'show => hide', [
        animate( '0.15s ease-in-out' )
      ] ),
      transition( 'hide => show', [
        animate( '0.15s ease-in-out' )
      ] ),
    ] ),
  ]
} )

export class AppComponent implements OnInit
{
  title = 'RoomLocatorWebapp';
  activeSection: LibrarySection;
  mobileMenuToggled = false;
  faBars = faBars;
  base64Image: string = "";

  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;
  @Select(TokenState.getUser) user$: Observable<User>;
  @Select(TokenState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private store: Store, private router: Router, private themeService: NbThemeService) {
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
    },
    {
      'title': 'Admin Page',
      'link': '/admin'
    }
  ];

  ngOnInit() {
    this.activeSection$.subscribe(x => {
      this.activeSection = x;
    } );

    this.store.dispatch(new GetSurveys());
    this.user$.subscribe(x => {
      if (x) {
        this.base64Image = `data:image/png;base64,${x.profileImage}`;
      }
    });

    this.router.events.subscribe( x =>
    {
      if ( x instanceof NavigationEnd )
      {
        switch ( x.urlAfterRedirects )
        {
          case '/mazemap':
            this.store.dispatch( new SetActivateFeedbackAndStatus( true ) );
            break;
          default:
            break;
        }
      }
    } );
  }

  userHasAccess ( link: string ): Observable<boolean>
  {
    switch ( link )
    {
      case '/':
        return new Observable( ( observer: any ) => observer.next( true ) );
      case '/mazemap':
        return new Observable( ( observer: any ) => observer.next( true ) );
      case '/calendar':
        return new Observable( ( observer: any ) => observer.next( true ) );
      case '/admin':
//          return this.userHasRole( [ 'admin'] ).pipe( tap( val => val ) );
        return new Observable( ( observer: any ) => observer.next( true ) );
      case '/survey-management':
        return this.userHasRole( [ 'library', 'researcher' ] ).pipe( tap( val => val ) );
      default:
        return new Observable( ( observer: any ) => observer.next( false ) );
    }
  }

  userHasRole ( roles: string[] ): Observable<boolean>
  {
    return this.user$.pipe( map( user =>
    {
      if ( user && user.roles )
      {
        return roles.filter( role => user.roles.includes( role ) ).length !== 0;
      }

      return false;
    } ) );
  }

  toggleMobileMenu ()
  {
    this.mobileMenuToggled = !this.mobileMenuToggled;
  }

  hideMobileMenu ()
  {
    this.mobileMenuToggled = false;
  }
}
