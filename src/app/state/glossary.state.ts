import {Action, Selector, State, StateContext} from "@ngxs/store";
import {GlossarySetAction} from "./glossary.actions";

export interface GlossaryEntryModel {
  id: string;
  header: string;
  description: string;
}

export type GlossaryEntriesOrdered = { [key: string]:GlossaryEntryModel[] };

export interface GlossaryStateModel {
  entries: GlossaryEntriesOrdered
}

@State<GlossaryStateModel>({
  name: 'glossary',
  defaults: {
    entries: {}
  }
})
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
