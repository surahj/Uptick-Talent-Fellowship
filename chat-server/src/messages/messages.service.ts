import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';
import { Identifier } from './schema/identifier.schema';

@Injectable()
export class MessagesService {
  messages = [];
  clientToUser = {};

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Identifier.name) private identifierModel: Model<Identifier>,
  ) {}

  public async create(createMessageDto: CreateMessageDto, clientId?: string) {
    const message = { ...createMessageDto };
    // const message = new this.messageModel({
    //   message: createMessageDto.message,
    //   name: createMessageDto.name,
    //   clientId,
    // });
    // return message.save();
    this.messages.push(message);
    return this.messages[-1];
  }

  public async findAll(): Promise<Message[]> {
    // return this.messageModel.find().exec();
    return this.messages;
  }

  public async identify(name: string, clientId: string) {
    // const message = new this.identifierModel({
    //   clientId,
    //   name,
    // });
    // return message.save();
    this.clientToUser[clientId] = name;
    return this.clientToUser[clientId]
  }

  async getClientName(cliendId: string) {
    // const client = await this.identifierModel.findOne({ cliendId }).exec();
    // return client.name;
    return this.clientToUser[cliendId];
  }
}
