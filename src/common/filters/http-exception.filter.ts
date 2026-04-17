import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import { Request, Response } from 'express';
import {AppError} from "../errors/app-error";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception?.message ?? "Internal Server Error";
        let code = undefined;

        console.log('Exception: ' + exception);

        if(exception instanceof BadRequestException){
            status = exception.getStatus();
            const response = exception.getResponse() as any;
            message = response.message;
        } else if(exception instanceof AppError){
            status = exception.statusCode
            message = exception.message;
            code = exception.errorCode;
        }

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: message,
                code: code
            });
    }
}