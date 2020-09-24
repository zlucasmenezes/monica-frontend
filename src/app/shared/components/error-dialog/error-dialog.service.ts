import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IErrorDialog } from './error-dialog.model';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  private isOpen = false;

  constructor(public dialog: MatDialog) {}

  public openDialog(data: IErrorDialog): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data,
      panelClass: 'm-error-dialog',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isOpen = false;
    });
  }
}
