import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MazemapComponent } from './mazemap/mazemap.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { RouterModule, Routes, RouterState } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { LoginState } from './states/login.state';
import { NgxsModule } from '@ngxs/store';


const appRoutes: Routes = [
  { path: 'https://auth.dtu.dk/dtu/?service=se2-webapp04.compute.dtu.dk', component: LoginButtonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MazemapComponent,
    LoginButtonComponent,
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
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NgxsModule.forRoot([
      LoginState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    LoginButtonComponent
  ]
})
export class AppModule { }
