
// import { ArgumentsHost, Catch, HttpException, HttpStatus, } from '@nestjs/common';
// import { BaseExceptionFilter } from '@nestjs/core';


// @Catch()
// export class AllExceptionsFilter extends BaseExceptionFilter {
//     override catch(exception: any, host: ArgumentsHost): void {
//     const contextType = host.getType();
//         console.log({contextType});
        
//     switch (contextType){
//         case 'http':
//             const ctx = host.switchToHttp();
//             const response = ctx.getResponse();
//             const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
//             const message = exception instanceof HttpException ? exception.message : 'Internal server error'
//             response.status(status).json({
//             statusCode: status,
//             message,
//             timestamp: new Date().toISOString(),
//             path: ctx.getRequest().url,
//         });
//             break
//         case 'rpc':

//             break
//     }

//     }
// }
// // 