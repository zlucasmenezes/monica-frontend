import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import headerUtils from '../../utils/header-utils';
import { IHeaderLink } from './header.model';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public name = environment.name;

  public backRoute: string;
  public routes: IHeaderLink[];

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.routes = headerUtils.getHeaderLinks();
  }

  ngOnInit() {
    this.backRoute = this.setRouteParams(this.getBackRoute());
  }

  private getBackRoute(): string {
    return this.activatedRoute.snapshot.data.backRoute;
  }

  private setRouteParams(route: string): string {
    if (!route) {
      return;
    }

    const params = route.split('/');
    params.forEach(param => {
      if (param.includes(':')) {
        route = route.replace(param, this.activatedRoute.snapshot.paramMap.get(param.replace(':', '')));
      }
    });

    return route;
  }

  public isCurrentRoute(route: string): boolean {
    return this.router.url.includes(`/${route}`);
  }

  public back(): void {
    this.router.navigate([this.backRoute]);
  }

  public goTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  public logout(): void {
    this.authService.logout();
  }
}
