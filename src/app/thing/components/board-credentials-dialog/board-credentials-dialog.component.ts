import { Component, OnInit, Inject } from '@angular/core';
import { IBoard } from '../../thing.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'm-board-credentials-dialog',
  templateUrl: './board-credentials-dialog.component.html',
  styleUrls: ['./board-credentials-dialog.component.scss']
})
export class BoardCredentialsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IBoard) {}

  ngOnInit(): void {
  }

}
