import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapComponent } from './components/mazemap/mazemap.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { SurveyManagementComponent } from './components/survey-management/survey-management.component';
import { CanActivateRouteGuard as AuthGuardService } from './_services/auth-guard.service';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LoginComponent } from './components/login/login/login.component';


const routes: Routes = [
  {
    path: 'validate',
    component: ValidateComponent,
  },
  {
    path: 'mazemap',
    component: MazemapComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'calendar',
    component: EventCalendarComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'survey-management',
    component: SurveyManagementComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
