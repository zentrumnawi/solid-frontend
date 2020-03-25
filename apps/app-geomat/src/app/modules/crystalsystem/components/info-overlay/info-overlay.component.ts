import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crystalsystem-info-overlay',
  template: `
    <h1 mat-dialog-title>{{Data.title}}</h1>
    <div mat-dialog-content>
      <p markdown [data]="Data.text"></p>
    </div>
  `
})
export class InfoOverlayComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public Data: { title: string, text: string }) {

  }
}
