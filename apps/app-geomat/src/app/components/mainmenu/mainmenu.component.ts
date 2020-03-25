import {Component, EventEmitter, Output} from '@angular/core';
import {BaseComponent} from '../../shared/abstract/base.component';
import {FeedbackService} from '../../services/feedback.service';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {oc} from 'ts-optchain';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent extends BaseComponent {
  public ActiveUrl = '';
  @Output() public MenuSelect = new EventEmitter();

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


  public async navigateTo(url: string) {
    this.MenuSelect.emit();
    await this._store.dispatch(new Navigate([url]));
  }
}
