import { NgModule } from '@angular/core';
import { TreeComponent } from './components/tree/tree.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { BaseComponent } from './components/base/base.component';
import { GridComponent } from './components/grid/grid.component';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { SolidProfileRoutingModule } from './solid-profile-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './state/profile.state';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatTreeModule } from '@angular/material/tree';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectedDirective } from './components/selected.directive';
import { ProfileDefinitionService } from './services/profile-definition.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([ProfileState]);

@NgModule({
  declarations: [
    TreeComponent,
    ListComponent,
    DetailComponent,
    BaseComponent,
    GridComponent,
    SelectedDirective,
  ],
  imports: [
    SolidCoreModule,
    SolidCoreModule,
    SolidProfileRoutingModule,
    MatTabsModule,
    ngxsFeatureModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTreeModule,
    MatCardModule,
  ],
  providers: [ProfileDefinitionService],
})
export class SolidProfileModule {
  constructor(registry: MatIconRegistry, url: DomSanitizer) {
    const addIcon = (name: string) =>
      registry.addSvgIcon(
        name,
        url.bypassSecurityTrustResourceUrl(`assets/svg/${name}.svg`),
      );
    addIcon('search');
  }
}
