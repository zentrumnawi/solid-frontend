import { ReplaySubject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
const sortByDate = function (a, b) {
  return b.valid_from.getTime() - a.valid_from.getTime();
};
export class MessagesService {
  _config;
  _http;
  messages = new ReplaySubject();
  messages$ = this.messages.asObservable();
  messageKey = 'solid_skeleton_messages';
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
    this.getMessages().subscribe();
  }
  getMessages() {
    const now = new Date(Date.now());
    const localMessages = [];
    const localData = localStorage.getItem(this.messageKey);
    if (localData) {
      localMessages.push(...JSON.parse(localData));
    }
    return this._http.get(`${this._config.apiUrl}/messages`).pipe(
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
      })
    );
  }
  updateMessageState(msgs) {
    if (!msgs) {
      return;
    }
    this.messages.next(msgs);
    localStorage.setItem(this.messageKey, JSON.stringify(msgs));
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MessagesService,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MessagesService,
    providedIn: 'root',
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MessagesService,
  decorators: [
    {
      type: Injectable,
      args: [
        {
          providedIn: 'root',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i1.HttpClient },
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2tlbGV0b24vc3JjL2xpYi9zZXJ2aWNlcy9tZXNzYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQWMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLHlCQUF5QixDQUFDOzs7QUFFN0UsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFlLEVBQUUsQ0FBZTtJQUMzRCxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6RCxDQUFDLENBQUM7QUFLRixNQUFNLE9BQU8sZUFBZTtJQVNXO0lBQzNCO0lBVEgsUUFBUSxHQUFrQyxJQUFJLGFBQWEsRUFFL0QsQ0FBQztJQUNHLFNBQVMsR0FBK0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUVwRSxVQUFVLEdBQUcseUJBQXlCLENBQUM7SUFFL0MsWUFDcUMsT0FBd0IsRUFDbkQsS0FBaUI7UUFEVSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUNuRCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBRXpCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sV0FBVztRQUNoQixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNqQyxNQUFNLGFBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELElBQUksU0FBUyxFQUFFO1lBQ2IsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUs7YUFDZCxHQUFHLENBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLFdBQVcsQ0FBQzthQUN0RCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVixPQUFPLEdBQUc7aUJBQ1AsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2YsT0FBTztvQkFDTCxHQUFHLE9BQU87b0JBQ1YsUUFBUSxFQUNOLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSTt3QkFDdkIsQ0FBQyxDQUFDLElBQUk7d0JBQ04sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFlLENBQUM7b0JBQ3ZDLFVBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBaUIsQ0FBQztvQkFDL0MsTUFBTSxFQUNKLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU07d0JBQzFELElBQUk7aUJBQ1AsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDZCxPQUFPLENBQ0wsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHO29CQUNwQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQzlDLENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRU0sa0JBQWtCLENBQUMsSUFBb0I7UUFDNUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQzt1R0E3RFUsZUFBZSxrQkFTaEIsaUJBQWlCOzJHQVRoQixlQUFlLGNBRmQsTUFBTTs7MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVVJLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgT2JzZXJ2YWJsZSwgbWFwLCB0YXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21lc3NhZ2UubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU09MSURfQ09SRV9DT05GSUcsIFNvbGlkQ29yZUNvbmZpZyB9IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1jb3JlJztcclxuXHJcbmNvbnN0IHNvcnRCeURhdGUgPSBmdW5jdGlvbiAoYTogTWVzc2FnZU1vZGVsLCBiOiBNZXNzYWdlTW9kZWwpIHtcclxuICByZXR1cm4gYi52YWxpZF9mcm9tLmdldFRpbWUoKSAtIGEudmFsaWRfZnJvbS5nZXRUaW1lKCk7XHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNTZXJ2aWNlIHtcclxuICBwdWJsaWMgbWVzc2FnZXM6IFJlcGxheVN1YmplY3Q8TWVzc2FnZU1vZGVsW10+ID0gbmV3IFJlcGxheVN1YmplY3Q8XHJcbiAgICBNZXNzYWdlTW9kZWxbXVxyXG4gID4oKTtcclxuICBwdWJsaWMgbWVzc2FnZXMkOiBPYnNlcnZhYmxlPE1lc3NhZ2VNb2RlbFtdPiA9IHRoaXMubWVzc2FnZXMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIHByaXZhdGUgbWVzc2FnZUtleSA9ICdzb2xpZF9za2VsZXRvbl9tZXNzYWdlcyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChTT0xJRF9DT1JFX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBTb2xpZENvcmVDb25maWcsXHJcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50XHJcbiAgKSB7XHJcbiAgICB0aGlzLmdldE1lc3NhZ2VzKCkuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TWVzc2FnZXMoKTogT2JzZXJ2YWJsZTxNZXNzYWdlTW9kZWxbXT4ge1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XHJcbiAgICBjb25zdCBsb2NhbE1lc3NhZ2VzOiBNZXNzYWdlTW9kZWxbXSA9IFtdO1xyXG4gICAgY29uc3QgbG9jYWxEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5tZXNzYWdlS2V5KTtcclxuICAgIGlmIChsb2NhbERhdGEpIHtcclxuICAgICAgbG9jYWxNZXNzYWdlcy5wdXNoKC4uLkpTT04ucGFyc2UobG9jYWxEYXRhKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5faHR0cFxyXG4gICAgICAuZ2V0PE1lc3NhZ2VNb2RlbFtdPihgJHt0aGlzLl9jb25maWcuYXBpVXJsfS9tZXNzYWdlc2ApXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgICAgIC5tYXAoKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4ubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIHZhbGlkX3RvOlxyXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlLnZhbGlkX3RvID09PSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgOiBuZXcgRGF0ZShtZXNzYWdlLnZhbGlkX3RvIGFzIGFueSksXHJcbiAgICAgICAgICAgICAgICB2YWxpZF9mcm9tOiBuZXcgRGF0ZShtZXNzYWdlLnZhbGlkX2Zyb20gYXMgYW55KSxcclxuICAgICAgICAgICAgICAgIHVucmVhZDpcclxuICAgICAgICAgICAgICAgICAgbG9jYWxNZXNzYWdlcy5maW5kKChtc2cpID0+IG1zZy5pZCA9PT0gbWVzc2FnZS5pZCk/LnVucmVhZCA/P1xyXG4gICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBtc2cudmFsaWRfZnJvbSA8IG5vdyAmJlxyXG4gICAgICAgICAgICAgICAgKG1zZy52YWxpZF90byA9PT0gbnVsbCB8fCBtc2cudmFsaWRfdG8gPiBub3cpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnNvcnQoc29ydEJ5RGF0ZSk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFwKChyZXMpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZVN0YXRlKHJlcyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVNZXNzYWdlU3RhdGUobXNnczogTWVzc2FnZU1vZGVsW10pIHtcclxuICAgIGlmICghbXNncykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tZXNzYWdlcy5uZXh0KG1zZ3MpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5tZXNzYWdlS2V5LCBKU09OLnN0cmluZ2lmeShtc2dzKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
