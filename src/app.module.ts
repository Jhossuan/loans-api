import { Module } from '@nestjs/common';
import { MongodbModule } from './infrastructure/persistence/mongodb/mongodb.module';
import { UserModule } from './users/presentation/user.module';
import {LoansModule} from "./loans/presetation/loan.module";

@Module({
  imports: [
      MongodbModule,
      UserModule,
      LoansModule
  ],
})
export class AppModule {}

