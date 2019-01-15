import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {AppState} from '../../models/app.model';
import {selectGlossaryEntries} from '../../models/selectors';
import {GlossaryService} from '../../services/glossary.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent {
  public Entries: any;
  constructor(
    service: GlossaryService,
    store: Store<AppState>,
  ) {
    service.loadGlossaryEntries();
    this.Entries = store.pipe(
      select(selectGlossaryEntries),
      map(entries => Object.entries(entries)),
    )
  }
}
