import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';

interface RpcErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  [key: string]: any; // For additional properties
}

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse();
        if (error instanceof RpcException){
          console.log("here");
          
        }
        if (error instanceof HttpException){
          console.log("there");
          
        }

        return throwError(() => error);
      })
    );
  }
}
