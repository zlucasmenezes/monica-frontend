import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBoard } from '../../thing.model';

@Component({
  selector: 'm-board-credentials-dialog',
  templateUrl: './board-credentials-dialog.component.html',
  styleUrls: ['./board-credentials-dialog.component.scss'],
})
export class BoardCredentialsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IBoard) {}

  ngOnInit(): void {}
}
