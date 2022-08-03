import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageController } from './message.controller';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ConversationModule],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
