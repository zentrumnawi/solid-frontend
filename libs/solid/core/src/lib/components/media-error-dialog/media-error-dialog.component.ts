import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../../solid-core-config';

@Component({
  selector: 'solid-core-media-error-dialog',
  templateUrl: './media-error-dialog.component.html',
  styleUrls: ['./media-error-dialog.component.scss'],
})
export class MediaErrorDialogComponent {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public name: string,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig
  ) {}
}
