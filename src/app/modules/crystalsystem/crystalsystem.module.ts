import { NgModule } from '@angular/core';

import { CrystalsystemRoutingModule } from './crystalsystem-routing.module';
import { CrystalsystemdetailComponent } from './components/crystalsystemdetail/crystalsystemdetail.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [CrystalsystemdetailComponent],
  imports: [
    SharedModule,
    CrystalsystemRoutingModule
  ]
})
export class CrystalsystemModule { }
