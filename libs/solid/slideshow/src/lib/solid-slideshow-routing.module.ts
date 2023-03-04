import { RouterModule, Routes } from '@angular/router';
import { SlideshowBaseComponent } from './components/slideshow-base/slideshow-base.component';
import { SlideshowSelectComponent } from './components/slideshow-select/slideshow-select.component';

const routes: Routes = [
  {
    path: '',
    component: SlideshowBaseComponent,
    children: [
      {
        path: ':categoriesSlug/:slideshowId/:slideshowPageId',
        component: SlideshowSelectComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

export const SolidSlideshowRoutingModule = RouterModule.forChild(routes);
