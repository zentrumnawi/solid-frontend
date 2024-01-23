import { ReplaySubject, Observable, map, tap } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid-core';

const sortByDate = function (a: MessageModel, b: MessageModel) {
  return b.valid_from.getTime() - a.valid_from.getTime();
};

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  public messages: ReplaySubject<MessageModel[]> = new ReplaySubject<
    MessageModel[]
  >();
  public messages$: Observable<MessageModel[]> = this.messages.asObservable();

  private messageKey = 'solid_skeleton_messages';

  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient,
  ) {
    this.getMessages().subscribe();
  }

  public getMessages(): Observable<MessageModel[]> {
    const now = new Date(Date.now());
    const localMessages: MessageModel[] = [];
    const localData = localStorage.getItem(this.messageKey);
    if (localData) {
      localMessages.push(...JSON.parse(localData));
    }
    return this._http
      .get<MessageModel[]>(`${this._config.apiUrl}/messages`)
      .pipe(
        map((res) => {
          return res
            .map((message) => {
              return {
                ...message,
                valid_to:
                  message.valid_to === null ? null : new Date(message.valid_to),
                valid_from: new Date(message.valid_from),
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
            })
            .sort(sortByDate);
        }),
        tap((res) => {
          this.updateMessageState(res);
        }),
      );
  }

  public updateMessageState(msgs: MessageModel[]) {
    if (!msgs) {
      return;
    }

    this.messages.next(msgs);
    localStorage.setItem(this.messageKey, JSON.stringify(msgs));
  }
}
