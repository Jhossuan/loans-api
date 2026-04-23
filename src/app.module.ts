import { Module } from '@nestjs/common';
import { MongodbModule } from './infrastructure/persistence/mongodb/mongodb.module';
import { UserModule } from './users/presentation/user.module';
import {LoansModule} from "./loans/presetation/loan.module";
import {APP_FILTER} from "@nestjs/core";
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";

@Module({
    imports: [
        MongodbModule,
        UserModule,
        LoansModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule {}

