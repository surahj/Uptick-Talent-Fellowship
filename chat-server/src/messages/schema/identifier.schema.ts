import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Identifier extends Document {
  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  time: Date;
}

export const IdentifierSchema = SchemaFactory.createForClass(Identifier);
