import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private defaultOptions: MatSnackBarConfig = {
    duration: 5000,
    panelClass: 'm-snackbar',
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  };

  constructor(private snackBar: MatSnackBar) {}

  public show(message: string, action: string = 'OK', options: MatSnackBarConfig = {}): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, { ...this.defaultOptions, ...options });
  }
}
