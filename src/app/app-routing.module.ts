import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapComponent } from './components/mazemap/mazemap.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { SurveyManagementComponent } from './components/survey-management/survey-management.component';

const routes: Routes = [
  {
    path: 'validate',
    component: ValidateComponent
  },
  {
    path: 'mazemap',
    component: MazemapComponent
  },
  {
    path: 'calendar',
    component: EventCalendarComponent
  },
  {
    path: 'survey-management',
    component: SurveyManagementComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
