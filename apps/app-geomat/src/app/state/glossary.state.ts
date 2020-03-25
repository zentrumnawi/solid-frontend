import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GlossarySetAction} from './glossary.actions';
import {Injectable} from '@angular/core';

export interface GlossaryEntryModel {
  id: string;
  header: string;
  description: string;
}

export interface GlossaryEntriesOrdered {
  [key: string]: GlossaryEntryModel[];
}

export interface GlossaryStateModel {
  entries: GlossaryEntriesOrdered;
}

@State<GlossaryStateModel>({
  name: 'glossary',
  defaults: {
    entries: {}
  }
})
@Injectable()
export class GlossaryState {
  @Selector()
  static entries(state: GlossaryStateModel) {
    return Object.entries(state.entries);
  }

  @Action(GlossarySetAction)
  set(ctx: StateContext<GlossaryStateModel>, action: GlossarySetAction) {
    ctx.patchState({
      entries: {...action.entries}
    });
  }
}
