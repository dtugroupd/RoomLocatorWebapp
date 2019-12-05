import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapComponent } from './components/mazemap/mazemap.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { SurveyManagementComponent } from './components/survey-management/survey-management.component';
import { AuthRouteGuard } from './_services/_guards/auth-guard.service';
import { AccessDeniedComponent } from './components/access_denied/access-denied.component';
import { AdminPageComponent } from './components/admin_page/admin-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/userprofile/userprofile.component';


const routes: Routes = [
  {
    path: 'validate',
    component: ValidateComponent,
  },
  {
    path: '',
    component: MazemapComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthRouteGuard],
    data: {
      expectedRoles: [{ name: 'admin', locationId: null }]
    }
  },
  {
    path: 'login',
    component: LoginComponent,
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
      expectedRoles: [{ name: 'researcher' }]
    }
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    canActivate: [AuthRouteGuard]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
