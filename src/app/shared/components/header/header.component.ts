import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public name = environment.name;

  public backRoute: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.backRoute = this.activatedRoute.snapshot.data.backRoute;
  }

  back() {
    this.router.navigate([this.backRoute]);
  }

  logout() {
    this.authService.logout();
  }

}
