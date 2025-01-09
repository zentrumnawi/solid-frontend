import { ModuleWithProviders } from '@angular/core';
import { SolidCoreConfig } from './solid-core-config';
import { TitleService } from './services/title.service';
import * as i0 from '@angular/core';
import * as i1 from './components/markdown/markdown.component';
import * as i2 from './components/media/media.component';
import * as i3 from './components/media-dialog/media-dialog.component';
import * as i4 from './components/media-error-dialog/media-error-dialog.component';
import * as i5 from './components/media-detail/media-detail.component';
import * as i6 from './components/media-toolbar/media-toolbar.component';
import * as i7 from './components/audio-toolbar/audio-toolbar.component';
import * as i8 from './components/audio-icon/audio-icon.component';
import * as i9 from '@angular/common';
import * as i10 from '@angular/forms';
import * as i11 from '@angular/common/http';
import * as i12 from '@angular/cdk/overlay';
import * as i13 from '@angular/material/icon';
import * as i14 from '@angular/material/button';
import * as i15 from '@angular/material/dialog';
import * as i16 from '@angular/cdk/scrolling';
import * as i17 from '@angular/material/slider';
export declare class SolidCoreModule {
  constructor(title: TitleService);
  static forRoot(config: SolidCoreConfig): ModuleWithProviders<SolidCoreModule>;
  static ɵfac: i0.ɵɵFactoryDeclaration<SolidCoreModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    SolidCoreModule,
    [
      typeof i1.MarkdownComponent,
      typeof i2.MediaComponent,
      typeof i3.MediaDialogComponent,
      typeof i4.MediaErrorDialogComponent,
      typeof i5.MediaDetailComponent,
      typeof i6.MediaToolbarComponent,
      typeof i7.AudioToolbarComponent,
      typeof i8.AudioIconComponent
    ],
    [
      typeof i9.CommonModule,
      typeof i10.FormsModule,
      typeof i11.HttpClientModule,
      typeof i10.ReactiveFormsModule,
      typeof i12.OverlayModule,
      typeof i13.MatIconModule,
      typeof i14.MatButtonModule,
      typeof i15.MatDialogModule,
      typeof i16.ScrollingModule,
      typeof i17.MatSliderModule
    ],
    [
      typeof i9.CommonModule,
      typeof i10.FormsModule,
      typeof i11.HttpClientModule,
      typeof i10.ReactiveFormsModule,
      typeof i1.MarkdownComponent,
      typeof i2.MediaComponent,
      typeof i16.ScrollingModule
    ]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<SolidCoreModule>;
}
