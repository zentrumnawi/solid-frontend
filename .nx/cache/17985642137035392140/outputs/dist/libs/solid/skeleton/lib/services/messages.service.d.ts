import { ReplaySubject, Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { HttpClient } from '@angular/common/http';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export declare class MessagesService {
  private _config;
  private _http;
  messages: ReplaySubject<MessageModel[]>;
  messages$: Observable<MessageModel[]>;
  private messageKey;
  constructor(_config: SolidCoreConfig, _http: HttpClient);
  getMessages(): Observable<MessageModel[]>;
  updateMessageState(msgs: MessageModel[]): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<MessagesService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<MessagesService>;
}
