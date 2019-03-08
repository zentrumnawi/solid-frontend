import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrystalsystemdetailComponent} from "./components/crystalsystemdetail/crystalsystemdetail.component";

const routes: Routes = [
  {path: '', component: CrystalsystemdetailComponent, data: { title: 'Kristallsysteme' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrystalsystemRoutingModule { }
