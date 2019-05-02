import {oc} from 'ts-optchain';
import {AppState} from './app.model';

export const selectRouterUrl = (state: AppState) => oc(state).router.state.url('/');

export const selectGlossaryEntries = (state: AppState) => oc(state).glossary({});
