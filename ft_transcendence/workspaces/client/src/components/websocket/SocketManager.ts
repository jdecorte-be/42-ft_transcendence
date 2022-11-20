import {io, Socket} from 'socket.io-client'
import { showNotification } from '@mantine/notifications';
import { SetterOrUpdater } from 'recoil';
import { SocketState } from './SocketState';
import { Listener } from './types';
import { ClientEvents } from '../../../../shared/client/ClientEvents';
import { ServerEvents } from '../../../../shared/server/ServerEvents';
import { ServerExceptionResponse } from '../../../../shared/server/types';


type EmitOptions<T> = {
    event: ClientEvents;
    data?: T;
};

export default class SocketManager
{
    public readonly socket: Socket;

    public setSocketState: SetterOrUpdater<SocketState>;

    public isConnectionLost: boolean = false;


    constructor()
    {
        this.socket = io(process.env.NEXT_PUBLIC_WS_API_URL as string, {
            autoConnect: false,
            path: 'wsapi',
            transports: ['websocket'],
            withCredentials: true,
        });
        this.onConnect();
        this.onDisconnect()
        this.onException();
    }

    // request to server
    emit<T>(options: EmitOptions<T> ) : this
    {
        this.socket.emit(options.event, options.data);

        return this;
    }

    getSocketId() : string | null
    {
        if(!this.socket.connect) {
            return null;
        }
        return this.socket.id;
    }

    connect() : void
    {
        this.socket.connect;
    }

    disconnect() : void
    {
        this.socket.disconnect;
    }

    // add client
    registerListener<T>(event: ServerEvents, listener: Listener<T>): this
    {
        this.socket.on(event, listener);
        return this;
    }

    // remove client
    removeListener<T>(event: ServerEvents, listener: Listener<T>): this
    {
        this.socket.off(event, listener);
        return this;
    }


    private onConnect() : void
    {
        this.socket.on('connect', () => {
            if(this.isConnectionLost) {
                showNotification({
                    message: 'Reconnected to server',
                    color: 'green',
                    autoClose: 2000,
                });
                this.isConnectionLost = false;
            }
        });
    }

    private onDisconnect() : void
    {
        this.socket.on('disconnect', async (reason: Socket.DisconnectReason) => {
            if(reason === 'io client disconnect') {
                showNotification({
                    message: 'Disconnected Successfully!',
                    color: 'green',
                    autoClose: 2000,
                });
            }
            if(reason === 'io server disconnect') {
                showNotification({
                    message: 'You got disconnect by server!',
                    color: 'orange',
                    autoClose: 3000, 
                });
            }
            if(reason === 'ping timeout' || reason === 'transport close' || reason === 'transport error') {
                showNotification({
                    message: 'Connection lost to the server!',
                    color: 'orange',
                    autoClose: 3000, 
                });
                this.isConnectionLost = true;
            }

            this.setSocketState((currVal) => {
                return {...currVal,connected:false};
            });
        });
    }

    private onException() : void
    {
        this.socket.on('exception', (data : ServerExceptionResponse) => {
            if(typeof data.exception === 'undefined') {
                showNotification({
                    message: 'Unexpected error from server',
                    color: 'red',
                });
                return;
            }
            let body = `Error: ${data.exception}`;

            if (data.message) {
              if (typeof data.message === 'string') {
                body += ` | Message: "${data.message}"`;
              } else if (typeof data.message === 'object') {
                body += ` | Message: "${JSON.stringify(data.message)}"`;
              }
            }
      
            showNotification({
              message: body,
              color: 'red',
            });
        });
    }
}
