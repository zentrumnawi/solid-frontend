import { NgModule } from '@angular/core';

import { CrystalsystemRoutingModule } from './crystalsystem-routing.module';
import { CrystalsystemdetailComponent } from './components/crystalsystemdetail/crystalsystemdetail.component';
import {SharedModule} from "../../shared/shared.module";
import {InfoOverlayComponent} from "./components/info-overlay/info-overlay.component";

@NgModule({
  declarations: [
    CrystalsystemdetailComponent,
    InfoOverlayComponent,
  ],
  imports: [
    SharedModule,
    CrystalsystemRoutingModule
  ]
})
export class CrystalsystemModule { }
