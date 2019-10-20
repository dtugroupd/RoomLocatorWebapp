import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MazemapComponent } from './mazemap/mazemap.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { RouterModule, Routes, RouterState } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbListModule, NbCardModule, NbDialogService, NbDialogModule, NbDialogRef, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { LoginState } from './states/login.state';
import { NgxsModule } from '@ngxs/store';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapState } from './states/mazemap.state';
import { SurveyComponent } from './survey/survey.component';
import { DynamicComponentService } from './services/DynamicComponentService';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackSmileyRowComponent } from './feedback-smiley-row/feedback-smiley-row.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
  ],
  entryComponents: [
    SurveyComponent,
    FeedbackComponent,
    FeedbackSmileyRowComponent
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
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NgxsModule.forRoot([
      LoginState,
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
