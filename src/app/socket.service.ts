import { Injectable } from '@angular/core';

const SERVER_URL = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: WebSocket;

    public initSocket(): WebSocket {
      console.log('conectando com servidor WS')
       return this.socket = new WebSocket(SERVER_URL);
    }
}
 