import { NgModule } from '@angular/core';

import { CrystalsystemRoutingModule } from './crystalsystem-routing.module';
import { CrystalsystemdetailComponent } from './components/crystalsystemdetail/crystalsystemdetail.component';
import { SharedModule } from '../../shared/shared.module';
import { SolidCoreModule } from '@zentrumnawi/solid/core';

@NgModule({
  declarations: [
    CrystalsystemdetailComponent,
  ],
  imports: [
    SharedModule,
    SolidCoreModule,
    CrystalsystemRoutingModule
  ]
})
export class CrystalsystemModule {
}
