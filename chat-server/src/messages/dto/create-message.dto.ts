import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
