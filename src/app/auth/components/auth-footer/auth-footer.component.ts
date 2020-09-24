import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'm-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss'],
})
export class AuthFooterComponent implements OnInit {
  version = environment.version;

  constructor() {}

  ngOnInit(): void {}
}
