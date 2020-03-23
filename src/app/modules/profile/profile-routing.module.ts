import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GalleryOverviewComponent} from "./components/gallery-overview/gallery-overview.component";
import {PhotographDetailComponent} from "./components/photograph-detail/photograph-detail.component";
import {ProfileBaseComponent} from "./components/profile-base/profile-base.component";

const routes: Routes = [
  {path: 'img', pathMatch: 'full', component: GalleryOverviewComponent, data: {title: 'Galerie'}},
  {path: 'img/:id', component: PhotographDetailComponent, data: {title: 'Galerie', noReuse: true}},
  {path: ':view', component: ProfileBaseComponent, data: {title: 'Steckbriefe'}},
  {path: ':view/:id', component: ProfileBaseComponent, data: {title: 'Steckbriefe'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
