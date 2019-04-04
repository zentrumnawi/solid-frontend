import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileTreeComponent} from './components/profile-tree/profile-tree.component';
import {GalleryOverviewComponent} from "./components/gallery-overview/gallery-overview.component";

const routes: Routes = [
  {path: 'img', pathMatch: 'full', component: GalleryOverviewComponent, data: {title: 'Galerie'}},
  {path: '', component: ProfileTreeComponent, data: {title: 'Steckbriefe'}, children: [
      { path: ':id', data: {title: 'Steckbriefe'} }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
