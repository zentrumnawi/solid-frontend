import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { detect } from 'detect-browser';
import { initSentry } from '@zentrumnawi/solid-skeleton';

const browser = detect();

let supportedBrowser = true;

if (browser) {
  switch (browser.name) {
    case 'ie':
      const text = document.createTextNode(
        `Ihr Webbrowser (Internet Explorer ${browser.version}) ist veraltet und wird nicht von der Anwendung unterstützt. Bitte nutzen Sie einen aktuelleren Browser.`
      );
      const body = document.getElementsByTagName('body');
      body[0].appendChild(text);
      supportedBrowser = false;
      break;
    default:
      break;
  }
}

initSentry(environment.sentry);

if (supportedBrowser) {
  if (environment.production) {
    enableProdMode();
  }
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}
