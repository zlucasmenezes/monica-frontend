import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() icon = 'emoji_nature';

  constructor() { }

  ngOnInit(): void {
  }

}
