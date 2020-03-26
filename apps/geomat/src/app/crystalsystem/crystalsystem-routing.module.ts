import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrystalsystemdetailComponent } from './crystalsystemdetail.component';

const routes: Routes = [
  {
    path: '',
    component: CrystalsystemdetailComponent,
    data: { title: 'Kristallsysteme' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrystalsystemRoutingModule {}
