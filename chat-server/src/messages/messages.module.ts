import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { Message, MessageSchema } from './schema/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Identifier, IdentifierSchema } from './schema/identifier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Identifier.name, schema: IdentifierSchema },
    ]),
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
