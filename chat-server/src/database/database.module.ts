import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService, Connection],
  exports: [DatabaseService],
})
export class DatabaseModule {}
