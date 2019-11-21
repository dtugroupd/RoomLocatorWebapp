import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MazemapComponent } from './components/mazemap/mazemap.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import
{
  NbThemeModule, NbLayoutModule, NbButtonModule, NbListModule,
  NbCardModule, NbDialogModule, NbToastrModule, NbAccordionModule,
  NbSearchModule, NbInputModule, NbMenuModule, NbContextMenuModule, NbActionsModule, NbUserModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapState } from './_states/mazemap.state';
import { SurveyCreateActionComponent } from './components/survey-create-action/survey-create-action.component';
import { DynamicComponentService } from './_services/DynamicComponentService';
import { SurveyFeedbackComponent } from './components/survey-feedback/survey-feedback.component';
import { SurveyFeedbackSmileyRowComponent } from './components/survey-feedback-smiley-row/survey-feedback-smiley-row.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SurveyCreateComponent } from './components/survey-create/survey-create.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { SurveyFeedbackButtonComponent } from './components/survey-feedback-button/survey-feedback-button.component';
import { StatusButtonComponent } from './components/status-button/status-button.component';
import { StatusButtonMenuComponent } from './components/status-button-menu/status-button-menu.component';
import { FormsModule } from '@angular/forms';
import { SurveyManagementComponent } from './components/survey-management/survey-management.component';
import { SurveyState } from './_states/survey.state';
import { AuthService } from './_services/auth.service';
import { AuthRouteGuard as authRouteGuard } from './_services/_guards/auth-guard.service';
import { TokenInterceptor } from './interceptors/tokenInterceptor';
import { TokenState } from './_states/token.state';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './components/access_denied/access-denied/access-denied.component';
import { AdminPageComponent } from './components/admin_page/admin-page.component';
import { AdminState } from './_states/admin.state';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


const appRoutes: Routes = [
  { path: 'https://auth.dtu.dk/dtu/?service=se2-webapp04.compute.dtu.dk', component: AppComponent },
];
@NgModule( {
  declarations: [
    AppComponent,
    ValidateComponent,
    MazemapComponent,
    SurveyCreateActionComponent,
    SurveyFeedbackComponent,
    SurveyFeedbackSmileyRowComponent,
    SurveyCreateComponent,
    EventCalendarComponent,
    SurveyFeedbackButtonComponent,
    StatusButtonComponent,
    StatusButtonMenuComponent,
    SurveyManagementComponent,
    AccessDeniedComponent,
    AdminPageComponent,
  ],
  entryComponents: [
    SurveyCreateActionComponent,
    SurveyFeedbackComponent,
    SurveyFeedbackSmileyRowComponent,
    SurveyFeedbackButtonComponent,
    SurveyCreateComponent,
    MazemapComponent,
    AdminPageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, { onSameUrlNavigation: 'reload', enableTracing: true },
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    NbThemeModule.forRoot( { name: 'default' } ),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbAccordionModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbSearchModule,
    NbUserModule,
    NbContextMenuModule,
    NbMenuModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxsModule.forRoot( [
      MazemapState,
      SurveyState,
      TokenState,
      AdminState
    ] ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }, DynamicComponentService, AuthService, authRouteGuard ],
  bootstrap: [ AppComponent ],
  exports: [
    SurveyCreateActionComponent,
  ]
} )
export class AppModule { }
