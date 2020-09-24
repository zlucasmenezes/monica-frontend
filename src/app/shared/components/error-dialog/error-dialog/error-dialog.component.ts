import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IErrorDialog } from '../error-dialog.model';

@Component({
  selector: 'm-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IErrorDialog) {}
}
