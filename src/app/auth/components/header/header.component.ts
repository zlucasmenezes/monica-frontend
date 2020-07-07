import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public name = environment.name;
  public link: string;

  constructor(private router: Router) { }

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
