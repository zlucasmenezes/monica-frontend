import { HttpErrorResponse } from '@angular/common/http';

export interface IErrorDialog extends HttpErrorResponse {
  error: IError;
}

interface IError {
  error: any;
  message: string;
}
