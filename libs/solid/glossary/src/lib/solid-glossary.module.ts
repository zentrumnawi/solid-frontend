import { NgModule } from '@angular/core';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { GlossaryComponent } from './components';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { NgxsModule } from '@ngxs/store';
import { GlossaryState } from './glossary.state';
import { RefDirective } from './components/link.directive';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([GlossaryState]);

@NgModule({
  declarations: [GlossaryComponent, RefDirective],
  imports: [
    SolidCoreModule,
    MatListModule,
    ngxsFeatureModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [GlossaryComponent],
})
export class SolidGlossaryModule {}
