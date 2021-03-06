import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'm-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
})
export class AuthHeaderComponent implements OnInit {
  public name = environment.name;
  public link: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.link = this.getLink();
  }

  navigateTo() {
    this.router.navigate([`/auth/${this.link.replace(/\s/g, '')}`]);
  }

  getLink(): string {
    const url = this.router.url.split('/');

    switch (url[url.length - 1]) {
      case 'login':
        return 'sign up';
      case 'signup':
        return 'log in';
    }
  }
}
