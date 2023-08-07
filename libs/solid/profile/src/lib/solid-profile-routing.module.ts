import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { BaseComponent } from './components/base/base.component';

const baseUrlSegment = new UrlSegment('', {});

const routes: Routes = [
  {
    matcher: (url: UrlSegment[]) => {
      if (url.length !== 2) {
        return { consumed: [baseUrlSegment] };
      }

      const firstUrlSegment = url[0]?.path;
      const secondUrlSegment = url[1]?.path;

      return {
        consumed: url,
        posParams: {
          type: new UrlSegment(firstUrlSegment, {}),
          id: new UrlSegment(secondUrlSegment, {}),
        },
      };
    },
    component: BaseComponent,
  },
];

export const SolidProfileRoutingModule = RouterModule.forChild(routes);
