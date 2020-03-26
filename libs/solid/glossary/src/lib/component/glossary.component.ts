import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GlossaryState } from '../glossary.state';
import { GlossaryActions } from '../glossary.actions';

@Component({
  selector: 'solid-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent {
  @Select(GlossaryState.entries)
  public Entries: any;

  constructor(
    store: Store,
  ) {
    store.dispatch(new GlossaryActions.Load());
  }
}
