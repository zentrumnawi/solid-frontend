import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-media-error-dialog',
  templateUrl: './media-error-dialog.component.html',
  styleUrls: ['./media-error-dialog.component.scss']
})
export class MediaErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: { title: string, content: string },
  ) {  }

}
