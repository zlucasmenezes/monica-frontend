import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ITSValue } from 'src/app/shared/models/ts.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { SocketIOService } from '../shared/socket-io/socket-io.service';
import { IRelay, IRelayPopulated } from './relay.model';

@Injectable({
  providedIn: 'root'
})
export class RelayService extends BaseService {

  constructor(
    http: HttpClient,
    private router: Router,
    private socketIOService: SocketIOService
    ) {
    super('project/:0/thing/:1/relay', http);
  }

  public async createRelay(projectId: string, relay: IRelay): Promise<void> {
    try {
      await this.http.post<IResponse>(`${this.getUrl(projectId, relay.thing)}`, relay).toPromise();
      this.router.navigate([`project/${projectId}/thing/${relay.thing}`]);
    }
    catch (e) {
      throw e;
    }
  }

  public async getRelays(projectId: string, thingId: string): Promise<IRelayPopulated[]> {
    try {
      const relays = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}`).toPromise();
      return relays.data;
    }
    catch (e) {
      throw e;
    }
  }

  public async getRelay(projectId: string, thingId: string, relayId: string): Promise<IRelayPopulated> {
    try {
      if (!relayId) { return; }

      const relay = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}/${relayId}`).toPromise();
      return relay.data;
    }
    catch (e) {
      throw e;
    }
  }

  public async editRelay(projectId: string, relayId: string, relay: IRelay): Promise<void> {
    try {
      const editedRelay = await this.http.put<IResponse>(`${this.getUrl(projectId, relay.thing)}/${relayId}`, relay).toPromise();
      this.router.navigate([`project/${projectId}/thing/${relay.thing}`]);
    }
    catch (e) {
      throw e;
    }
  }

  public async getValue(projectId: string, thingId: string, relayId: string): Promise<Observable<ITSValue>> {
    const value = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}/${relayId}/value`).toPromise();

    const value$ = new BehaviorSubject<ITSValue>(value.data ? value.data : null);
    const unsubscribeValue$ = new Subject<void>();
    value$.pipe(finalize(() => { unsubscribeValue$.next(); unsubscribeValue$.complete(); }));

    this.socketIOService.on(relayId).pipe(takeUntil(unsubscribeValue$)).subscribe((data: ITSValue) => {
      value$.next(data);
    });

    return value$.asObservable();
  }

  public async insertTSData(projectId: string, thingId: string, relayId: string, value: boolean): Promise<void> {
    try {
      this.http.post<IResponse>(`${this.getUrl(projectId, thingId)}/${relayId}/ts`, {value}).toPromise();
    }
    catch (e) {
      throw e;
    }
  }

}
