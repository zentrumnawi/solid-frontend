import { Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  GlossaryEntryModel,
  GlossaryState,
  GlossaryStateModel,
} from '../glossary.state';
import { GlossaryActions } from '../glossary.actions';
import { combineLatest, Observable, Subject } from 'rxjs';
import { RefDirective } from './link.directive';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'solid-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})
export class GlossaryComponent implements OnDestroy {
  private $destroyed = new Subject();
  public Filter = new FormControl('');
  @ViewChildren(RefDirective, { read: RefDirective })
  public refElements!: QueryList<RefDirective>;
  @Select(GlossaryState.state)
  public State!: Observable<GlossaryStateModel>;
  public GlossaryEntries: Observable<GlossaryStateModel>;

  constructor(store: Store) {
    store.dispatch(new GlossaryActions.Load());
    this.GlossaryEntries = combineLatest([
      this.Filter.valueChanges.pipe(startWith('')),
      this.State,
    ]).pipe(
      map((val) => {
        const filterStr: string = (val[0] as string).toLowerCase();
        const state = val[1];
        if (filterStr === '') {
          return state;
        }
        const validEntryIds = Object.values(state.entries)
          .filter((entry: GlossaryEntryModel) => {
            return (
              entry.term.toLowerCase().includes(filterStr) ||
              entry.text.toLowerCase().includes(filterStr)
            );
          })
          .map((entry) => entry.id);
        const filteredSections = state.sections
          .filter((section) => {
            return section[1].some((id) => validEntryIds.includes(id));
          })
          .map((section) => {
            return [
              section[0],
              section[1].filter((id) => validEntryIds.includes(id)),
            ] as [string, number[]];
          });
        return { sections: filteredSections, entries: state.entries };
      }),
      takeUntil(this.$destroyed)
    );
  }

  followRef(refId: number) {
    this.Filter.setValue('');
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

  ngOnDestroy(): void {
    this.$destroyed.next();
  }
}
