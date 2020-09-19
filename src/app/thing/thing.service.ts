import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { SocketIOService } from 'src/app/shared/socket-io/socket-io.service';
import { IResponse } from '../shared/models/backend.model';
import { BoardCredentialsDialogComponent } from './components/board-credentials-dialog/board-credentials-dialog.component';
import { IBoard, IBoardStatus, IThing, IThingPopulated } from './thing.model';

@Injectable({
  providedIn: 'root'
})
export class ThingService extends BaseService {

  constructor(
    http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private socketIOService: SocketIOService
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
        this.router.navigate([`/project/${thing.project}/thing/${(board.data as IBoard)._id}`]);
      });
    }
    catch (e) {
      throw e;
    }
  }

  public async getThings(projectId: string): Promise<IThingPopulated[]> {
    try {
      const things = await this.http.get<IResponse>(`${this.getUrl(projectId)}`).toPromise();
      return things.data as IThingPopulated[];
    }
    catch (e) {
      throw e;
    }
  }

  public async getThing(projectId: string, thingId: string): Promise<IThingPopulated> {
    try {
      if (!thingId) { return; }

      const thing = await this.http.get<IResponse>(`${this.getUrl(projectId)}/${thingId}`).toPromise();
      return thing.data as IThingPopulated;
    }
    catch (e) {
      throw e;
    }
  }

  public async editThing(thingId: string, thing: IThing): Promise<void> {
    try {
      const editedThing = await this.http.put<IResponse>(`${this.getUrl(thing.project)}/${thingId}`, thing).toPromise();
      this.router.navigate([`/project/${thing.project}/thing`]);
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

  public async getBoardStatus(projectId: string, thingId: string): Promise<Observable<IBoardStatus>> {
    const status = await this.http.get<IResponse>(`${this.getUrl(projectId)}/${thingId}/board`).toPromise();

    const status$ = new BehaviorSubject<IBoardStatus>(status ? status.data : null);
    const unsubscribeStatus$ = new Subject<void>();
    status$.pipe(finalize(() => { unsubscribeStatus$.next(); unsubscribeStatus$.complete(); }));

    this.socketIOService.on('board_status').pipe(takeUntil(unsubscribeStatus$)).subscribe((data) => {
      status$.next(data);
    });

    return status$.asObservable();
  }

}
