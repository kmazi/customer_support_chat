import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { SseventModule } from './ssevent/ssevent.module';

@Module({
  imports: [UserModule, RoleModule, ConversationModule, MessageModule, SseventModule]
})
export class ApiModule {}
