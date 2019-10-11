import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateComponent } from './auth/validate/validate.component';
import { MazemapComponent } from './mazemap/mazemap.component';

const routes: Routes = [
  {
    path: 'validate',
    component: ValidateComponent
  },
  {
    path: 'mazemap',
    component: MazemapComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
