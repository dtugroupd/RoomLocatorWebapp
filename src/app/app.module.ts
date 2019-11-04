import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MazemapComponent } from './mazemap/mazemap.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { RouterModule, Routes, RouterState } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbListModule, NbCardModule, NbDialogService, NbDialogModule, NbDialogRef, NbToastrModule, NbAccordionModule, NbCardComponent, NbSearchModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapState } from './states/mazemap.state';
import { SurveyComponent } from './survey/survey.component';
import { DynamicComponentService } from './services/DynamicComponentService';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackSmileyRowComponent } from './feedback-smiley-row/feedback-smiley-row.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { CalendarviewComponent } from './calendarview/calendarview.component';
import { FeedbackButtonComponent } from './feedback-button/feedback-button.component';
import { StatusButtonComponent } from './status-button/status-button.component';
import { StatusButtonMenuComponent } from './status-button-menu/status-button-menu.component';
import { FormsModule } from '@angular/forms';

import { RolesViewComponent } from './components/roles-view/roles-view.component';
import { UserState } from './states/user.state';

const appRoutes: Routes = [
  { path: 'https://auth.dtu.dk/dtu/?service=se2-webapp04.compute.dtu.dk', component: LoginButtonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ValidateComponent,
    MazemapComponent,
    LoginButtonComponent,
    SurveyComponent,
    FeedbackComponent,
    FeedbackSmileyRowComponent,
    CreateSurveyComponent,
    CalendarviewComponent,
    FeedbackButtonComponent,
    StatusButtonComponent,
    StatusButtonMenuComponent,
    RolesViewComponent,
  ],
  entryComponents: [
    SurveyComponent,
    FeedbackComponent,
    FeedbackSmileyRowComponent,
    FeedbackButtonComponent,
    CreateSurveyComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
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
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbSearchModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NgxsModule.forRoot([
      UserState,
      MazemapState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [ DynamicComponentService ],
  bootstrap: [AppComponent],
  exports: [
    LoginButtonComponent,
    SurveyComponent
  ]
})
export class AppModule { }
