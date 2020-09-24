import { browser, by, element } from 'protractor';
import { environment } from './../../src/environments/environment';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getAppName(): Promise<string> {
    return Promise.resolve(environment.name);
  }

  getAppVersion(): Promise<string> {
    return Promise.resolve(environment.version);
  }

  getAppContent(): Promise<string> {
    return element(by.css('app-root')).getText() as Promise<string>;
  }
}
