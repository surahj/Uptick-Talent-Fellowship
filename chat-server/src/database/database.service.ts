import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    let retries = 5;

    while (retries > 0) {
      try {
        (await this.connection.readyState) === 1; // Wait for the connection to be ready

        this.logger.log('Successfully connected to MongoDB database');
        console.log('Successfully connected to MongoDB database');

        break;
      } catch (err) {
        this.logger.error(err);

        this.logger.error(
          `There was an error connecting to the database, retrying... (${retries})`,
        );

        retries -= 1;

        await new Promise((res) => setTimeout(res, 3_000)); // Wait for three seconds
      }
    }
  }

  async onModuleDestroy() {
    await this.connection.close();
  }
}
