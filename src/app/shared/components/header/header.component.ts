import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public name = environment.name;

  public backRoute: string;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

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

  public back() {
    this.router.navigate([this.backRoute]);
  }

  public logout() {
    this.authService.logout();
  }
}
