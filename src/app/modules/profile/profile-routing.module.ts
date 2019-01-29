import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileTreeComponent} from './components/profile-tree/profile-tree.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ProfileTreeComponent, data: {title: 'Steckbriefe'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
