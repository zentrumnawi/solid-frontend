// import { RouterModule, Routes } from '@angular/router';
// import { BaseComponent } from './components/base/base.component';

// const routes: Routes = [
//   { path: ':view', redirectTo: ':view/' },
//   {
//     path: '',
//     component: BaseComponent,
//   },
//   { path: '', pathMatch: 'full', redirectTo: 'tree/' },
// ];

// export const SolidProfileRoutingModule = RouterModule.forChild(routes);

import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { BaseComponent } from './components/base/base.component';

const routes: Routes = [
  {
    matcher: (url) => {
      if (url.length === 0) {
        return { consumed: url };
      } else {
        const firstUrlSegment = url[0]?.path; // *_related or (tree, grid - temporary for PLANTY)
        const regExpFirstSegment = new RegExp(/\W*(_related)\W*/);

        const secondUrlSegment = url[1]?.path; // id
        const regExSecondSegment = new RegExp(/^\d+$/); // should be number and exists in the profiles

        const isValid =
          ((!regExpFirstSegment.test(firstUrlSegment) &&
            firstUrlSegment === 'tree') ||
            firstUrlSegment === 'grid' ||
            regExpFirstSegment.test(firstUrlSegment)) &&
          regExSecondSegment.test(secondUrlSegment);
        return isValid
          ? {
              consumed: url,
              posParams: {
                type: new UrlSegment(firstUrlSegment, {}),
                id: new UrlSegment(secondUrlSegment, {}),
              },
            }
          : { consumed: [new UrlSegment('', {})] };
      }
    },
    component: BaseComponent,
  },
];

export const SolidProfileRoutingModule = RouterModule.forChild(routes);
