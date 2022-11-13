import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AppComponent} from "./app.component";
import {AddSondeComponent} from "./add-sonde/add-sonde.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-sonde',
    component: AddSondeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
