import { NgModule } from '@angular/core';

import { CrystalsystemRoutingModule } from './crystalsystem-routing.module';
import { CrystalsystemdetailComponent } from './crystalsystemdetail.component';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CrystalsystemdetailComponent],
  imports: [
    SolidCoreModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    CrystalsystemRoutingModule,
  ],
})
export class CrystalsystemModule {}
