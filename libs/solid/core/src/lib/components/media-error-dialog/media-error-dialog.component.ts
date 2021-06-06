import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'solid-core-media-error-dialog',
  templateUrl: './media-error-dialog.component.html',
  styleUrls: ['./media-error-dialog.component.scss'],
})
export class MediaErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public name: string
  ) {}
}
