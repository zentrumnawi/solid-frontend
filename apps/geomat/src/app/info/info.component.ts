import { Component, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE
} from '@zentrumnawi/solid/skeleton';
import * as version from '../../environments/version.json';

@Component({
  selector: 'geomat-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  public Version =
    version && version.semver && version.semver.version
      ? version.semver.version
      : 'Version unbekannt';

  constructor(
    private _store: Store,
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) public feedback: FeedbackService
  ) {}
}
