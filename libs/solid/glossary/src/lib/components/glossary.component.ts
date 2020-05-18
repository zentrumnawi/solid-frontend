import { Component, QueryList, ViewChildren } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GlossaryState, GlossaryStateModel } from '../glossary.state';
import { GlossaryActions } from '../glossary.actions';
import { Observable } from 'rxjs';
import { RefDirective } from './link.directive';

@Component({
  selector: 'solid-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})
export class GlossaryComponent {
  @ViewChildren(RefDirective, { read: RefDirective })
  public refElements!: QueryList<RefDirective>;
  @Select(GlossaryState.state)
  public State!: Observable<GlossaryStateModel>;

  constructor(store: Store) {
    store.dispatch(new GlossaryActions.Load());
  }

  followRef(refId: number) {
    setTimeout(() => {
      const refElement = this.refElements.find((r) => r.refId === refId);
      if (!refElement) {
        return;
      }
      refElement.ref.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
      refElement.highlighted = true;
      setTimeout(() => {
        refElement.highlighted = false;
      }, 1000);
    });
  }
}
