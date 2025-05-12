import { Catch, RpcExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const error = exception.getError()
     const errorResponse: RpcErrorResponse =isRpcError(error) ? {
         message: error.message,
         statusCode : error.status
     } : {
        message : 'Internal server Error' ,
        statusCode : HttpStatus.INTERNAL_SERVER_ERROR
     }  
    return throwError(() => errorResponse);
  }
}
export interface IRpcError {
  message: string;
  errorCode: string;
  status: number;
  details?: any; // or you can replace `any` with a more specific type if known
}

export function isRpcError(obj: any): obj is IRpcError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.message === 'string' &&
    typeof obj.errorCode === 'string' &&
    typeof obj.status === 'number'
  );
}
export interface RpcErrorResponse {
  message: string;
  statusCode: number;  // Make it optional if you want
  errorCode?: string;
  [key: string]: any;   // Allow additional properties
}