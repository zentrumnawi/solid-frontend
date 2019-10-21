import {Component} from '@angular/core';

const version = require('../../../environments/version.json');

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  public Version = version && version.semver && version.semver.version ? version.semver.version : 'Version unbekannt';
}
