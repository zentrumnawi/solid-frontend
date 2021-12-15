import { Component, Inject } from '@angular/core';
import { version } from '../../environments/version';
import pjs from '../../../../../package.json';

import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '@zentrumnawi/solid-skeleton';

@Component({
  selector: 'dive-info-page-content',
  templateUrl: './info-page-content.component.html',
  styleUrls: ['./info-page-content.component.scss'],
})
export class InfoPageContentComponent {
  public appVersion =
    version && version.semver && version.semver.version
      ? version.semver.version
      : undefined;
  public solidVersion = pjs.version ? pjs.version : 'Version unbekannt';

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) public feedback: FeedbackService
  ) {}
}
