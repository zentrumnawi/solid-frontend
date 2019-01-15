import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../models/app.model';
import {selectRouterUrl} from '../../models/selectors';
import {BaseComponent} from '../../shared/abstract/base.component';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent extends BaseComponent {
  public ActiveUrl = '';

  constructor(
    store: Store<AppState>,
  ) {
    super();
    this.addSub(store.pipe(select(selectRouterUrl)).subscribe(url => {
      this.ActiveUrl = url;
    }));
  }
}
