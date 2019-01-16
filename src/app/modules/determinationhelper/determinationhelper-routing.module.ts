import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeterminationHelperComponent} from './components/determination-helper/determination-helper.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: DeterminationHelperComponent, data: {title: 'Bestimmungshelfer'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeterminationHelperRoutingModule {
}
