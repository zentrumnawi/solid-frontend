import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { BaseComponent } from './components/base/base.component';

const baseUrlSegment = new UrlSegment('', {});

const routes: Routes = [
  {
    matcher: (url: UrlSegment[]) => {
      if (url.length !== 2) {
        return { consumed: [baseUrlSegment] };
      }

      const firstUrlSegment = url[0]?.path; // type: *_related
      const regExFirstSegment = new RegExp(/\W*(_related)\W*/);

      const secondUrlSegment = url[1]?.path; // id
      const regExSecondSegment = new RegExp(/^\d+$/);

      const isValid =
        (firstUrlSegment === 'tree' || // (tree, grid - temporary for PLANTY)
          firstUrlSegment === 'grid' ||
          regExFirstSegment.test(firstUrlSegment)) &&
        regExSecondSegment.test(secondUrlSegment);

      return isValid
        ? {
            consumed: url,
            posParams: {
              type: new UrlSegment(firstUrlSegment, {}),
              id: new UrlSegment(secondUrlSegment, {}),
            },
          }
        : { consumed: [baseUrlSegment] };
    },
    component: BaseComponent,
  },
];

export const SolidProfileRoutingModule = RouterModule.forChild(routes);
