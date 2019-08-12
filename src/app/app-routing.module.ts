import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from './components/info/info.component';
import {PrivacyComponent} from './components/privacy/privacy.component';

const routes: Routes = [
  {path: 'info', component: InfoComponent, data: {title: 'Informationen'}},
  {path: 'privacy', component: PrivacyComponent, data: {title: 'Datenschutzerklärung'}},
  {path: 'gallery', loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryModule)},
  {
    path: 'determination',
    loadChildren: () => import('./modules/determinationhelper/determinationhelper.module').then(m => m.DeterminationHelperModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
