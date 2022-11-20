import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsResponse,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
// import { AuthenticatedSocket } from '@app/game/types';


export enum ClientEvents
{
  Ping = 'client.ping',
}

export enum ServerEvents
{
  Pong = 'server.pong',
}

@WebSocketGateway()
export class GameGateway
{
  @SubscribeMessage(ClientEvents.Ping)
  onPing(client: Socket): void
  {
    client.emit(ServerEvents.Pong, {
      message: 'pong',
    });
  }
}

