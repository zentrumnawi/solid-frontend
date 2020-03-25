import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  private _onDestroy: (() => void)[] = [];
  private _subs: Subscription[] = [];

  public ngOnDestroy(): void {
    this._onDestroy.forEach(cb => cb());
    this._subs.forEach(s => s.unsubscribe());
  }

  public addOnDestroy(...callbacks: (() => void)[]) {
    this._onDestroy.push(...callbacks);
  }

  protected addSub(...subscriptions: Subscription[]) {
    this._subs.push(...subscriptions);
  }

}
