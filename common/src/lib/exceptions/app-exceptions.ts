import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiStatusCode } from './interfaces/api-response.interface';

export class AppException extends HttpException {
  constructor(
    public override readonly message: string,
    public readonly statusCode: ApiStatusCode,
    public readonly errors?: any
  ) {
    super(
      {
        success: false,
        statusCode,
        message,
        errors,
        timestamp: new Date().toISOString(),
      },
      statusCode
    );
  }

  static badRequest(
    message: string = 'درخواست نامعتبر است',
    errors?: any
  ): AppException {
    return new AppException(message, ApiStatusCode.BAD_REQUEST, errors);
  }

  static unauthorized(
    message: string = 'دسترسی غیرمجاز',
    errors?: any
  ): AppException {
    return new AppException(message, ApiStatusCode.UNAUTHORIZED, errors);
  }

  static forbidden(
    message: string = 'دسترسی به این منبع ممنوع است',
    errors?: any
  ): AppException {
    return new AppException(message, ApiStatusCode.FORBIDDEN, errors);
  }

  static notFound(
    message: string = 'منبع مورد نظر یافت نشد',
    errors?: any
  ): AppException {
    return new AppException(message, ApiStatusCode.NOT_FOUND, errors);
  }

  static conflict(
    message: string = 'تداخل در عملیات',
    errors?: any
  ): AppException {
    return new AppException(message, ApiStatusCode.CONFLICT, errors);
  }

  static internal(
    message: string = 'خطای داخلی سرور',
    errors?: any
  ): AppException {
    return new AppException(
      message,
      ApiStatusCode.INTERNAL_SERVER_ERROR,
      errors
    );
  }
}
