import { NgModule } from '@angular/core';
import { TreeComponent } from './components/tree/tree.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { BaseComponent } from './components/base/base.component';
import { GridComponent } from './components/grid/grid.component';
import { SolidCoreModule } from '@zentrumnawi/solid/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SolidProfileRoutingModule } from './solid-profile-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './state/profile.state';
import { ProfileService } from './services/profile.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  declarations: [
    TreeComponent,
    ListComponent,
    DetailComponent,
    BaseComponent,
    GridComponent
  ],
  imports: [
    SolidCoreModule,
    MatTabsModule,
    SolidCoreModule,
    SolidProfileRoutingModule,
    NgxsModule.forFeature([
      ProfileState
    ]),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTreeModule
  ],
  providers: [
    ProfileService
  ]
})
export class SolidProfileModule {
  constructor(registry: MatIconRegistry, url: DomSanitizer) {
    const addIcon = (name: string) => registry.addSvgIcon(name, url.bypassSecurityTrustResourceUrl(`/assets/svg/${name}.svg`));
    addIcon('search');
  }
}
