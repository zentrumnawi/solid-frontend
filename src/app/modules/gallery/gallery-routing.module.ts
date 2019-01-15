import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GalleryOverviewComponent} from './components/gallery-overview/gallery-overview.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: GalleryOverviewComponent, data: {title: 'Galerie'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {
}
