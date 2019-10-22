import {Component} from '@angular/core';
import {BaseComponent} from '../../shared/abstract/base.component';
import {FeedbackService} from "../../services/feedback.service";
import {oc} from "ts-optchain";
import {Store} from "@ngxs/store";

const version = require('../../../environments/version.json');

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent extends BaseComponent {
  public ActiveUrl = '';
  public Version = version && version.semver && version.semver.version ? version.semver.version : 'Version unbekannt';

  constructor(
    private _store: Store,
    private _feedback: FeedbackService,
  ) {
    super();
    this._store.select(s => oc(s.router).state.url('/')).subscribe(url => {
      this.ActiveUrl = url;
    });
  }
  public onFeedbackClick() {
    this._feedback.showFeedbackDialog();
  }
}
