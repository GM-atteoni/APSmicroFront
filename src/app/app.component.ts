import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private socketService: SocketService){}
  
  flagConect: boolean = false;

  status = 'Sem conexão'; 
  temperatura = '0';
  umidade = '0';

  socket:WebSocket;

  ngOnInit(): void { 
    this.status = 'Sem conexão';
  }

  clickConectar(){
    if(this.socket == undefined){
      this.initIoConnection();
    }else if(this.socket.readyState != this.socket.OPEN){
      this.initIoConnection();
    }
  }

  public initIoConnection(): void {
    this.status = 'Tentando conexão...'
    this.socket = this.socketService.initSocket();

    this.socket.onopen = function() {
      this.status = 'Conexão aberta'  
      this.flagConect = true;
    }.bind(this)

    this.socket.onmessage = function(data) {
      this.status = 'Conectado';
      if(data.data.includes('-')){
        let aux = data.data.replace('-', '').split(';');
        this.temperatura = aux[0];
        this.umidade = aux[1];
      }else{
        this.temperatura = data.data;
        this.umidade = data.data;
      }
      
      console.log(data);
    }.bind(this)
 
    this.socket.onerror = function (err) {
      this.flagConect = false;
      this.status = 'Erro na conexão';
      console.log(err);
    }.bind(this)

    this.socket.onclose = function () {
      this.flagConect = false;
      this.status = 'Conexão fechada'
    }.bind(this);
  }

  emitirAlerta(){
    this.socket.send('ok')
  }

}
