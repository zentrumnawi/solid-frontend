import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../../solid-core-config';

@Component({
  selector: 'solid-core-media-error-dialog',
  templateUrl: './media-error-dialog.component.html',
  styleUrls: ['./media-error-dialog.component.scss'],
})
export class MediaErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public name: string,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig
  ) {}
}
