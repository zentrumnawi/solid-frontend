import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent, data: { title: 'Informationen' } },
  { path: 'privacy', component: PrivacyComponent, data: { title: 'Datenschutzerklärung' } },
  {
    path: 'slideshow',
    loadChildren: () => import('./modules/slideshow/slideshow.module').then(m => m.SlideshowModule)
  }, {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'system',
    loadChildren: () => import('./modules/crystalsystem/crystalsystem.module').then(m => m.CrystalsystemModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('@zentrumnawi/solid/quiz').then(m => m.SolidQuizModule)
  },
  {path: '', pathMatch: 'full', component: LandingPageComponent, data: {title: 'Startseite'}},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
