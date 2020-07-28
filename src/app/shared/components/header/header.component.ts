import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public name = environment.name;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

}
