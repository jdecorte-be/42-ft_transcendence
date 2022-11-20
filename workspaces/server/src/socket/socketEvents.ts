import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import { getSystemErrorMap } from "util";

// For accept request from all domain
@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3001',
        methods: ["GET", "POST"],
    },
})

export class SocketEvents {
    @WebSocketServer()
    server : Server;

    // connection
    handleConnection(client : Socket) {
        console.log(`Client connected : ${client.id}`);
    }

    // disconnection
    handleDisconnect(client : Socket) {
        console.log(`Client disconnected : ${client.id}`);
    }

    @SubscribeMessage('message')
    handleEvent(@MessageBody() data: string) {
        // send to event
        console.log(`Client Message : ${data}`);
        this.server.emit('message', data);
    }

    @SubscribeMessage('chat.send')
    sendChat(@MessageBody() data) {
        // send message in chat
        console.log("Msg receive from server")
        this.server.emit('chat.receive', data);
    }

    @SubscribeMessage('chat.newgroup')
    newGroup(@MessageBody() data) {
        // send message in chat
        console.log("New Group created");
        this.server.emit('chat.newgroup', data);
    }
}