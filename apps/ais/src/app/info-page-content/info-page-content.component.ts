import { Component, Inject } from '@angular/core';
import * as version from '../../environments/version.json';
import { Store } from '@ngxs/store';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '@zentrumnawi/solid-skeleton';

@Component({
  selector: 'ais-info-page-content',
  templateUrl: './info-page-content.component.html',
  styleUrls: ['./info-page-content.component.scss'],
})
export class InfoPageContentComponent {
  public Version =
    version && version.semver && version.semver.version
      ? version.semver.version
      : 'Version unbekannt';

  constructor(
    private _store: Store,
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) public feedback: FeedbackService
  ) {}
}
