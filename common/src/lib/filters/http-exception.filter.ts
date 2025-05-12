import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

// @Catch(HttpException)
// export class AllExceptionsFilter extends BaseExceptionFilter {
//     override catch(exception: HttpException, host: ArgumentsHost): void {
//             const ctx = host.switchToHttp();
//             const response = ctx.getResponse();
//             const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
//             const message = exception instanceof HttpException ? exception.message : 'Internal server error'
//             response.status(status).json({
//             statusCode: status,
//             message,
//             timestamp: new Date().toISOString(),
//             path: ctx.getRequest().url
//             })
//         }
// }
