import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../exceptions/api-response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // اگر پاسخی که از کنترلر برمی‌گردد از نوع ApiResponse نیست،
        // آن را به فرمت استاندارد تبدیل می‌کنیم
        if (!(data instanceof ApiResponse)) {
          return ApiResponse.success(data);
        }
        return data;
      })
    );
  }
}
