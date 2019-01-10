import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppModel, selectRouterUrl} from '../../models/app.model';
import {BaseComponent} from '../../shared/abstract/base.component';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent extends BaseComponent {
  public ActiveUrl = '';

  constructor(
    store: Store<AppModel>,
  ) {
    super();
    this.addSub(store.pipe(select(selectRouterUrl)).subscribe(url => {
      this.ActiveUrl = url;
    }));
  }
}
