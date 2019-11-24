import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapComponent } from './components/mazemap/mazemap.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { SurveyManagementComponent } from './components/survey-management/survey-management.component';
import { AuthRouteGuard } from './_services/_guards/auth-guard.service';
import { AccessDeniedComponent } from './components/access_denied/access-denied/access-denied.component';


const routes: Routes = [
  {
    path: 'validate',
    component: ValidateComponent,
  },
  {
    path: 'mazemap',
    component: MazemapComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'calendar',
    component: EventCalendarComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'survey-management',
    component: SurveyManagementComponent,
    canActivate: [AuthRouteGuard],
    data: {
      expectedRoles: 'researcher'
    }
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
