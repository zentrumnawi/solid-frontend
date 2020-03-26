import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SolidSkeletonModule } from '@zentrumnawi/solid/skeleton';

@Component({
  selector: 'geomat-root',
  template: '<solid-skeleton-base-layout></solid-skeleton-base-layout>',
  styleUrls: []
})
export class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('hide_landing') === 'true' && SolidSkeletonModule.isLandingHiddenEnabled) {
      this.document.body.classList.add('landing-hidden');
    }
  }
}
