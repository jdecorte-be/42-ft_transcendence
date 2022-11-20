import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './game/game.gateway';
import { SocketModule } from './socket/socket.module';
import {Database} from './database/database.module'

@Module({
  imports: [SocketModule, Database],
  controllers: [AppController],
  providers: [AppService, GameGateway],
})
export class AppModule {}
