import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IErrorDialog } from './error-dialog.model';
import { ErrorDialogService } from './error-dialog.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.error instanceof Blob) {
          error.error = new Error(error.statusText);
        }

        this.errorDialogService.openDialog(error as IErrorDialog);
        return throwError(error);
      })
    );
  }
}
