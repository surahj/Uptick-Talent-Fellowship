import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: false })
  clientId: string;

  @Prop({ default: Date.now })
  time: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
