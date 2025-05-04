import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from './api-response';
import { ApiStatusCode } from './interfaces/api-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'خطای داخلی سرور';
    let errors = undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as any;

      statusCode = exception.getStatus();

      if (typeof exceptionResponse === 'object') {
        message = exceptionResponse.message || message;
        errors = exceptionResponse.errors || undefined;
      } else {
        message = exceptionResponse || message;
      }
    } else if (exception.name === 'ValidationError') {
      // مدیریت خطاهای اعتبارسنجی Mongoose
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'خطای اعتبارسنجی';
      errors = exception.errors;
    } else if (exception.code === '23505') {
      // مدیریت خطاهای unique constraint در PostgreSQL
      statusCode = HttpStatus.CONFLICT;
      message = 'این رکورد قبلا ثبت شده است';
    } else if (exception.code === '23503') {
      // مدیریت خطاهای foreign key در PostgreSQL
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'خطا در ارتباط با رکوردهای دیگر';
    }

    // ثبت خطا در سیستم لاگینگ
    console.error(`Exception: ${exception.message}`, exception.stack);

    const apiResponse = ApiResponse.error(
      statusCode as unknown as ApiStatusCode,
      message,
      errors
    );

    response.status(statusCode).json(apiResponse);
  }
}
