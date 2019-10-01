import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateComponent } from './auth/validate/validate.component';


const routes: Routes = [
  {
    path: 'validate',
    component: ValidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
