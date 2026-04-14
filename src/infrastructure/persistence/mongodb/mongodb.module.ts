import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { envs } from '../../../config/envs';
import mongoose from 'mongoose';

@Module({
  imports: [MongooseModule.forRoot(envs.mongoUrl)],
})
export class MongodbModule implements OnModuleInit {

  private readonly logger: Logger = new Logger("Database Module");

  async onModuleInit() {
    mongoose.connection.on('connected', () => {
      this.logger.log('✅ Successfully connected to MongoDB');
      console.log('✅ Successfully connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error('🚨 MongoDB connection error:', err);
      console.error('🚨 MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB disconnected');
      console.warn('⚠️ MongoDB disconnected');
    });
  }

}
