import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {DeterminationHelperComponent} from './components/determination-helper/determination-helper.component';

import {DeterminationHelperRoutingModule} from './determinationhelper-routing.module';

@NgModule({
  declarations: [DeterminationHelperComponent],
  imports: [
    SharedModule,
    DeterminationHelperRoutingModule,
  ],
})
export class DeterminationHelperModule {
}
