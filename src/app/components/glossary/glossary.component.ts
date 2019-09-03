import {Component} from '@angular/core';
import {GlossaryService} from '../../services/glossary.service';
import {Store} from "@ngxs/store";
import {GlossaryState} from "../../state/glossary.state";
@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent {
  public Entries: any;
  constructor(
    service: GlossaryService,
    store: Store,
  ) {
    service.loadGlossaryEntries();
    this.Entries = store.select(GlossaryState.entries);
  }
}
