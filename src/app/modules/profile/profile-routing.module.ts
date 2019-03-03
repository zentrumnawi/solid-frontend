import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileDetailComponent} from './components/profile-detail/profile-detail.component';
import {ProfileTreeComponent} from './components/profile-tree/profile-tree.component';

const routes: Routes = [
  {path: '', component: ProfileTreeComponent, data: {title: 'Steckbriefe'}, children: [
      { path: ':id', component: ProfileDetailComponent, data: {title: 'Steckbriefe'} }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
