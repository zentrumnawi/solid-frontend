import { RouterModule, Routes } from '@angular/router';
import { CategoriesSelectComponent } from './components/categories-select/categories-select.component';
import { SlideshowSelectComponent } from './components/slideshow-select/slideshow-select.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesSelectComponent,
  },
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
