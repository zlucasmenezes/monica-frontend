import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { IThing, IBoard } from './thing.model';
import { MatDialog } from '@angular/material/dialog';
import { BoardCredentialsDialogComponent } from './components/board-credentials-dialog/board-credentials-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ThingService extends BaseService {

  constructor(
    http: HttpClient,
    private router: Router,
    public dialog: MatDialog
    ) {
    super('project/:0/thing', http);
  }

  public async createThing(thing: IThing): Promise<void> {
    try {
      const board = await this.http.post<IResponse>(`${this.getUrl(thing.project)}`, thing).toPromise();

      const dialogRef = this.dialog.open(BoardCredentialsDialogComponent, {
        data: board?.data,
        panelClass: 'm-dialog',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate([`/project/${thing.project}/thing/${(board.data as IBoard)._id}/sensor/create`]);
      });
    }
    catch (e) {
      throw e;
    }
  }

  public async getTypes(projectId: string): Promise<string[]> {
    try {
      const types = await this.http.get<IResponse>(`${this.getUrl(projectId)}/types`).toPromise();
      return types.data;
    }
    catch (e) {
      throw e;
    }
  }

}
