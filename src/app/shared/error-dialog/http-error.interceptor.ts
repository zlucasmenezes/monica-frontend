import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorDialogService } from './error-dialog.service';
import { IErrorDialog } from './error-dialog.model';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(public errorDialogService: ErrorDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorDialogService.openDialog(error as IErrorDialog);
          return throwError(error);
        }));
    }
}
