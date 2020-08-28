import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() icon = 'emoji_nature';

  @Input() disableGoTo = false;
  @Input() disableEdit = false;
  @Input() disableRemove = false;

  @Input() actions = false;

  @Output('goTo') goToEmitter = new EventEmitter<void>();
  @Output('edit') editEmitter = new EventEmitter<void>();
  @Output('remove') removeEmitter = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public goTo() {
    this.goToEmitter.emit();
  }

  public edit() {
    this.editEmitter.emit();
  }

  public remove() {
    this.removeEmitter.emit();
  }

}
