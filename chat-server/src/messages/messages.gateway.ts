import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  public async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.create(
      createMessageDto,
      client.id,
    );
    const data = `${createMessageDto.name}:  ${createMessageDto.message}`;
    this.server.emit('message', data);
  }

  @SubscribeMessage('findAllMessages')
  async findAll() {
    const data = await this.messagesService.findAll();
    console.log(data);
    const message = data.map(
      (message) => `[${message.name} : ${message.message}]`,
    );
    console.log('message', message);
    return message;
  }

  @SubscribeMessage('joinChat')
  async join(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
    const clientName = await this.messagesService.identify(name, client.id);
    const data = `${clientName} joined this chat`
    this.server.emit('joined', data);
  }
}
