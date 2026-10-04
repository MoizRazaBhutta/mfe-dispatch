import { NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { singleSpaAngular } from 'single-spa-angular';
import { App } from './app/app';
import { appConfig } from './app/app.config';

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    // Passes customProps (Session data) from Shell into Angular app configuration
    return bootstrapApplication(App, {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),
        { provide: 'SINGLE_SPA_PROPS', useValue: singleSpaProps }
      ]
    });
  },
  template: '<app-mfe-dispatch></app-mfe-dispatch>',
  NgZone,
  domElementGetter: () => {
    const el = document.getElementById('single-spa-application:@hub/mfe-dispatch');
    if (!el) {
      throw new Error('Target container #single-spa-application:@hub/mfe-dispatch not found in Shell!');
    }
    return el;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;