import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwtService: JwtService){}
  @WebSocketServer() server;
  users: number = 0;
  async handleConnection() {
    this.users++;
    this.server.emit('users', this.users);
  }
  async handleDisconnect() {
    this.users--;
    this.server.emit('users', this.users);
  }
  @SubscribeMessage('join')
  async joinRoom(client: Socket, id) {
    this.jwtService.verifyAsync(id).then(data => {
      client.join(data._id); 
    }).catch(console.error)
    return {event: 'join', id}
  }
  @SubscribeMessage('chat')
  async onChat(client: Socket, message) {
    if(message?.message){
      client.to(message.reciverId).emit('chat', message);
    }
    return {event: 'chat', message}
  }
}