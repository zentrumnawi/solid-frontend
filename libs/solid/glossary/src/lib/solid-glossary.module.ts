import { NgModule } from '@angular/core';
import { SolidCoreModule } from '@zentrumnawi/solid/core';
import { GlossaryComponent } from './component/glossary.component';
import { MatListModule } from '@angular/material/list';
import { NgxsModule } from '@ngxs/store';
import { GlossaryState } from './glossary.state';

@NgModule({
  declarations: [
    GlossaryComponent
  ],
  imports: [
    SolidCoreModule,
    MatListModule,
    NgxsModule.forFeature([GlossaryState])
  ],
  exports: [
    GlossaryComponent
  ]
})
export class SolidGlossaryModule {
}
