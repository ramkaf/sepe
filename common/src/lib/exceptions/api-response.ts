import { ApiStatusCode } from './interfaces/api-response.interface';

export class ApiResponse<T> {
  success: boolean;
  statusCode: ApiStatusCode;
  message: string;
  data?: T;
  errors?: any;
  timestamp: string;

  constructor(options: {
    success: boolean;
    statusCode: ApiStatusCode;
    message: string;
    data?: T;
    errors?: any;
  }) {
    this.success = options.success;
    this.statusCode = options.statusCode;
    this.message = options.message;
    this.data = options.data;
    this.errors = options.errors;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(
    data?: T,
    message: string = 'عملیات با موفقیت انجام شد'
  ): ApiResponse<T> {
    return new ApiResponse<T>({
      success: true,
      statusCode: ApiStatusCode.SUCCESS,
      message,
      data,
    });
  }

  static created<T>(
    data?: T,
    message: string = 'آیتم با موفقیت ایجاد شد'
  ): ApiResponse<T> {
    return new ApiResponse<T>({
      success: true,
      statusCode: ApiStatusCode.CREATED,
      message,
      data,
    });
  }

  static error<T>(
    statusCode: ApiStatusCode = ApiStatusCode.INTERNAL_SERVER_ERROR,
    message: string = 'خطای سرور',
    errors?: any
  ): ApiResponse<T> {
    return new ApiResponse<T>({
      success: false,
      statusCode,
      message,
      errors,
    });
  }
}
