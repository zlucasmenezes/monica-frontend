import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { IToken } from 'src/app/auth/auth.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SocketIOEvent } from './socket-io.model';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  private socket: SocketIOClient.Socket;
  private rooms: string[] = [];

  constructor() { }

  public connect(tokenData: IToken) {
    this.socket = io.connect(`http://${environment.backend.host}:${environment.backend.port}`, {
      query: { token: tokenData.token }
    });

    this.socket.on('user_connected', (data) => {
      console.log(`${data.userId} connected`);

      this.rooms.forEach(room => {
        this.socket.emit('join_room', room);
      });
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public on(event: SocketIOEvent): Observable<any> {
    if (this.socket) {
      return new Observable((observable) => {
        this.socket.on(event, (data) => {
          observable.next(data);
        });
      });
    }
  }

  public join(room: string) {
    if (!this.rooms.includes(room)) {
      this.socket.emit('join_room', room);
      this.rooms.push(room);
    }
  }

  public leave(room: string) {
    if (this.rooms.includes(room)) {
      this.socket.emit('leave_room', room);
      this.rooms = this.rooms.filter(r => r !== room);
    }
  }

  public isConnected(): boolean {
    if (!this.socket) { return false; }
    return this.socket.connected;
  }

}
