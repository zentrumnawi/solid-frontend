import {RouterStateParams} from "../custom-router-state-serializer";
import {GlossaryStateModel} from "./glossary.state";

export interface AppState {
  glossary: GlossaryStateModel
  router: RouterStateParams,
}
