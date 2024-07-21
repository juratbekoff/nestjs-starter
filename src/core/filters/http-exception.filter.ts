import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCodeEnum } from '../enums';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    if (request.method === 'OPTIONS') {
      return response.status(HttpStatus.OK).send();
    }

    this.logger.error(exception);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? ErrorCodeEnum.INTERNAL_SERVER_ERROR
        : (exception as any)?.response?.message || exception.message;

    response.status(status).type('application/json').json({
      message,
      success: false,
      statusCode: status,
      path: request.url,
    });
  }
}
