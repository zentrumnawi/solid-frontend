import {Component, EventEmitter, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BaseComponent} from '../../shared/abstract/base.component';
import {AppState} from '../../state/app.model';
import {selectRouterUrl} from '../../state/selectors';
import {FeedbackService} from "../../services/feedback.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent extends BaseComponent {
  public ActiveUrl = '';
  @Output() public MenuSelect = new EventEmitter();

  constructor(
    store: Store<AppState>,
    private _feedback: FeedbackService,
    private _router: Router,
  ) {
    super();
    this.addSub(store.pipe(select(selectRouterUrl)).subscribe(url => {
      this.ActiveUrl = url;
    }));
  }

  public onFeedbackClick() {
    this._feedback.showFeedbackDialog();
  }


  public async navigateTo(url: string) {
    this.MenuSelect.emit();
    await this._router.navigateByUrl(url);
  }
}
