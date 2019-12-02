import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MazemapComponent } from './components/mazemap/mazemap.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule, NbLayoutModule, NbButtonModule, NbListModule,
  NbCardModule, NbDialogModule, NbToastrModule, NbAccordionModule,
  NbSearchModule, NbInputModule, NbMenuModule, NbContextMenuModule,
  NbActionsModule, NbUserModule, NbSelectModule, NbCheckboxModule, NbDatepickerModule
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyManagementComponent } from './components/survey-management/survey-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthRouteGuard as authRouteGuard } from './_services/_guards/auth-guard.service';
import { TokenInterceptor } from './interceptors/tokenInterceptor';
import { TokenState } from './_states/token.state';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './components/access_denied/access-denied.component';
import { AdminPageComponent } from './components/admin_page/admin-page.component';
import { AdminState } from './_states/admin.state';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTableModule, MatInputModule, MatDialogModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventState } from './_states/event.state';
import { EventUpdateComponent } from './components/event-update/event-update.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { UserDisclaimerState } from './_states/user.state';
import { ShowFeedbackComponent } from './components/showFeedback/show-feedback.component';


const appRoutes: Routes = [
  { path: 'https://auth.dtu.dk/dtu/?service=se2-webapp04.compute.dtu.dk', component: AppComponent },
];
@NgModule({
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
    ShowFeedbackComponent,
    StatusButtonMenuComponent,
    SurveyManagementComponent,
    AccessDeniedComponent,
    EventCreateComponent,
    AdminPageComponent,
    LoginComponent,
    EventUpdateComponent,
    UserDeleteComponent,
  ],
  entryComponents: [
    SurveyCreateActionComponent,
    SurveyFeedbackComponent,
    SurveyFeedbackSmileyRowComponent,
    SurveyFeedbackButtonComponent,
    SurveyCreateComponent,
    ShowFeedbackComponent,
    MazemapComponent,
    AdminPageComponent,
    EventUpdateComponent,
    UserDeleteComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: "reload",
      enableTracing: true
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbDatepickerModule.forRoot(),
    NbAccordionModule,
    NbActionsModule,
    MatDialogModule,
    NbCardModule,
    MatTableModule,
    NbInputModule,
    NbListModule,
    NbSearchModule,
    NbUserModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NbContextMenuModule,
    NbMenuModule,
    NbSelectModule,
    NbCheckboxModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxsModule.forRoot([
      MazemapState,
      TokenState,
      AdminState,
      EventState,
      UserDisclaimerState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DynamicComponentService,
    authRouteGuard
  ],
  bootstrap: [AppComponent],
  exports: [SurveyCreateActionComponent, MatFormFieldModule, MatInputModule]
})
export class AppModule {}
