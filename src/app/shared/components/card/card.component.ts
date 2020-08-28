import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() icon = 'emoji_nature';

  @Input() actions = false;

  @Input() disableGoTo = false;
  @Input() disableAdd = false;
  @Input() disableEdit = false;
  @Input() disableRemove = false;

  @Input() hideGoTo = false;
  @Input() hideAdd = false;
  @Input() hideEdit = false;
  @Input() hideRemove = false;

  @Output('goTo') goToEmitter = new EventEmitter<void>();
  @Output('add') addEmitter = new EventEmitter<void>();
  @Output('edit') editEmitter = new EventEmitter<void>();
  @Output('remove') removeEmitter = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public goTo() {
    this.goToEmitter.emit();
  }

  public add() {
    this.addEmitter.emit();
  }

  public edit() {
    this.editEmitter.emit();
  }

  public remove() {
    this.removeEmitter.emit();
  }

}
