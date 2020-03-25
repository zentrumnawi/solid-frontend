import { NgModule } from '@angular/core';

import { CrystalsystemRoutingModule } from './crystalsystem-routing.module';
import { CrystalsystemdetailComponent } from './components/crystalsystemdetail/crystalsystemdetail.component';
import { SharedModule } from '../../shared/shared.module';
import { InfoOverlayComponent } from './components/info-overlay/info-overlay.component';
import { SolidCoreModule } from '@zentrumnawi/solid/core';

@NgModule({
  declarations: [
    CrystalsystemdetailComponent,
    InfoOverlayComponent
  ],
  imports: [
    SharedModule,
    SolidCoreModule,
    CrystalsystemRoutingModule
  ]
})
export class CrystalsystemModule {
}
