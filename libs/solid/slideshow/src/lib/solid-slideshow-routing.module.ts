import { RouterModule, Routes } from '@angular/router';
import { SlideshowSelectComponent } from './components/slideshow-select/slideshow-select.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';

const routes: Routes = [
  {
    path: ':categoriesSlug',
    component: SlideshowSelectComponent,
  },
  {
    path: ':categoriesSlug/:slideshowId',
    component: SlideshowComponent,
  },
];

export const SolidSlideshowRoutingModule = RouterModule.forChild(routes);
