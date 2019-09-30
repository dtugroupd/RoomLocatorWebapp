import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MazemapComponent } from './mazemap/mazemap.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'mazemap', component: MazemapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
