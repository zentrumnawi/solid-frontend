import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { MessageModel, MessageType } from './message.model';
import { MessageActions } from './message.actions';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid-core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface MessageStateModel {
  items: MessageModel[];
}

@State<MessageStateModel>({
  name: 'message',
  defaults: {
    items: [],
  },
})
@Injectable()
export class MessageState {
  private static LOCAL_STORAGE_KEY = 'solid_skeleton_messages';
  @Selector()
  public static getChangelog(state: MessageStateModel): MessageModel[] {
    const filter = function (msg: MessageModel) {
      return msg.type === MessageType.Changelog;
    };
    return state.items.filter(filter);
  }

  @Selector()
  public static getNotices(state: MessageStateModel): MessageModel[] {
    const filter = function (msg: MessageModel) {
      return msg.type === MessageType.Notice;
    };
    return state.items.filter(filter);
  }

  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient,
    store: Store
  ) {
    setTimeout(() => store.dispatch(new MessageActions.LoadEntries()));
  }

  @Action(MessageActions.LoadEntries)
  public loadEntries(
    { setState }: StateContext<MessageStateModel>,
    {}: MessageActions.LoadEntries
  ) {
    const now = new Date(Date.now());
    const localMessages: MessageModel[] = [];
    const localData = localStorage.getItem(MessageState.LOCAL_STORAGE_KEY);
    if (localData) {
      localMessages.push(...JSON.parse(localData));
    }
    return this._http
      .get<MessageModel[]>(`${this._config.newApiUrl}/api/messages`)
      .pipe(
        map((res) => {
          return res
            .map((message) => {
              return {
                ...message,
                valid_to:
                  message.valid_to === null
                    ? null
                    : new Date(message.valid_to as any),
                valid_from: new Date(message.valid_from as any),
                unread:
                  localMessages.find((msg) => msg.id === message.id)?.unread ??
                  true,
              };
            })
            .filter((msg) => {
              return (
                msg.valid_from < now &&
                (msg.valid_to === null || msg.valid_to > now)
              );
            });
        }),
        tap((res) => {
          setState({
            items: res,
          });
        }),
        tap((res) => {
          localStorage.setItem(
            MessageState.LOCAL_STORAGE_KEY,
            JSON.stringify(res)
          );
        })
      );
  }
}
