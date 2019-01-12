import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {AppModel} from '../../models/app.model';
import {selectGlossaryEntries} from '../../models/selectors';
import {GlossaryService} from '../../services/glossary.service';
import {BaseComponent} from '../../shared/abstract/base.component';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent {
  public Entries: any;
  constructor(
    service: GlossaryService,
    store: Store<AppModel>,
  ) {
    super();
    service.loadGlossaryEntries();
    this.Entries = store.pipe(
      select(selectGlossaryEntries),
      map(entries => Object.entries(entries)),
    )//.subscribe(entries => {
      // this.Entries = Object.entries(entries);
  }
}
