import { Route } from '@angular/router';

export interface MRoute extends Route {
  data?: RouteData;
}

interface RouteData {
  backRoute: string;
}
