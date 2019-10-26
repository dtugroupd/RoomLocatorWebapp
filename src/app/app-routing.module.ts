import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapComponent } from './mazemap/mazemap.component';
import { CalendarviewComponent } from './calendarview/calendarview.component';

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
    component: CalendarviewComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
