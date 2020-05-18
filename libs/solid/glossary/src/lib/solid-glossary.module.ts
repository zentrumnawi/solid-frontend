import { NgModule } from '@angular/core';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { GlossaryComponent } from './components';
import { MatListModule } from '@angular/material/list';
import { NgxsModule } from '@ngxs/store';
import { GlossaryState } from './glossary.state';
import { RefDirective } from './components/link.directive';

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([GlossaryState]);

@NgModule({
  declarations: [GlossaryComponent, RefDirective],
  imports: [SolidCoreModule, MatListModule, ngxsFeatureModule],
  exports: [GlossaryComponent],
})
export class SolidGlossaryModule {}
