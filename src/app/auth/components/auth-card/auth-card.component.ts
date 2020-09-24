import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'm-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
