import { RouterModule, Routes } from '@angular/router';
import { SlideshowBaseComponent } from './components/slideshow-base/slideshow-base.component';

const routes: Routes = [
  {
    path: '',
    component: SlideshowBaseComponent,
    children: [
      {
        path: ':categoriesSlug/:slideshowId/:slideshowPageId',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

export const SolidSlideshowRoutingModule = RouterModule.forChild(routes);
