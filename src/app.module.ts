import { Module } from '@nestjs/common';
import { MongodbModule } from './infrastructure/persistence/mongodb/mongodb.module';
import { UserModule } from './users/presentation/user.module';
import {LoansModule} from "./loans/presetation/loan.module";
import {APP_FILTER, APP_GUARD} from "@nestjs/core";
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";
import {AuthGuard} from "./common/auth/guards/auth.guard";
import {AuthModule} from "./common/auth/auth.module";

@Module({
    imports: [
        MongodbModule,
        UserModule,
        LoansModule,
        AuthModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }
    ]
})
export class AppModule {}

