import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MazemapComponent } from './components/mazemap/mazemap.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbListModule,
         NbCardModule, NbDialogModule, NbToastrModule, NbAccordionModule,
         NbSearchModule, NbInputModule, NbMenuModule, NbContextMenuModule, NbActionsModule } from '@nebular/theme';
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
import { RolesViewComponent } from './components/roles-view/roles-view.component';
import { SurveyManagementComponent } from './components/survey-management/survey-management.component';
import { SurveyState } from './_states/survey.state';
import { UserState } from './_states/user.state';
import { AuthService } from './_services/auth.service';
import { CanActivateRouteGuard } from './_services/auth-guard.service';
import { LoginComponent } from './components/login/login/login.component';
import { TokenInterceptor } from './interceptors/tokenInterceptor';

const appRoutes: Routes = [
  { path: 'https://auth.dtu.dk/dtu/?service=se2-webapp04.compute.dtu.dk', component: LoginButtonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ValidateComponent,
    MazemapComponent,
    LoginButtonComponent,
    SurveyCreateActionComponent,
    SurveyFeedbackComponent,
    SurveyFeedbackSmileyRowComponent,
    SurveyCreateComponent,
    EventCalendarComponent,
    SurveyFeedbackButtonComponent,
    StatusButtonComponent,
    StatusButtonMenuComponent,
    RolesViewComponent,
    SurveyManagementComponent,
    LoginComponent,
  ],
  entryComponents: [
    SurveyCreateActionComponent,
    SurveyFeedbackComponent,
    SurveyFeedbackSmileyRowComponent,
    SurveyFeedbackButtonComponent,
    SurveyCreateComponent,
    MazemapComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { onSameUrlNavigation: 'reload', enableTracing: true },
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbAccordionModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbSearchModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NgxsModule.forRoot([
      UserState,
      MazemapState,
      SurveyState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, DynamicComponentService, AuthService, CanActivateRouteGuard],
  bootstrap: [AppComponent],
  exports: [
    LoginButtonComponent,
    SurveyCreateActionComponent
  ]
})
export class AppModule { }
