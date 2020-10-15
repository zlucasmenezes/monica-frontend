import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class FileService {
  constructor() {}

  public download(blob: Blob, type: string, fileName: string): void {
    const url: string = URL.createObjectURL(new Blob([blob], { type }));
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public getFileNameFromHeader(response: HttpResponse<Blob>) {
    let fileName = `${Date.now()}`;

    const contentDisposition = response.headers.get('Content-Disposition');

    const regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = regex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      fileName = matches[1].replace(/['"]/g, '');
    }

    return fileName;
  }
}
