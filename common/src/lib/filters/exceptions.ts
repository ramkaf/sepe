import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

// Base custom RPC error class that extends RpcException
export class BaseRpcError extends RpcException {
  readonly status: number;
  override readonly stack: string;

  constructor(
    message: string,
    private readonly errorCode: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    private readonly details?: any
  ) {
    super({ message, errorCode, status, details });
    this.status = status;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error implementations
export class NotFoundRpcError extends BaseRpcError {
  constructor(resource: string, id?: string | number) {
    const message = id
      ? `${resource} with id ${id} not found`
      : `${resource} not found`;
    super(message, 'NOT_FOUND', HttpStatus.NOT_FOUND);
  }
}

export class ValidationRpcError extends BaseRpcError {
  constructor(errors: Record<string, any>) {
    super(
      'Validation failed',
      'VALIDATION_ERROR',
      HttpStatus.BAD_REQUEST,
      errors
    );
  }
}

export class UnauthorizedRpcError extends BaseRpcError {
  constructor(message = 'Unauthorized access') {
    super(message, 'UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenRpcError extends BaseRpcError {
  constructor(message = 'Forbidden access') {
    super(message, 'FORBIDDEN', HttpStatus.FORBIDDEN);
  }
}

export class ConflictRpcError extends BaseRpcError {
  constructor(resource: string, field: string, value: any) {
    super(
      `${resource} with ${field} ${value} already exists`,
      'CONFLICT',
      HttpStatus.CONFLICT
    );
  }
}

export class TimeoutRpcError extends BaseRpcError {
  constructor(service: string) {
    super(
      `Request to ${service} service timed out`,
      'TIMEOUT',
      HttpStatus.GATEWAY_TIMEOUT
    );
  }
}

export class InternalRpcError extends BaseRpcError {
  constructor(message = 'Internal server error') {
    super(message, 'INTERNAL_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class BadGatewayRpcError extends BaseRpcError {
  constructor(service: string) {
    super(
      `Failed to receive valid response from ${service} service`,
      'BAD_GATEWAY',
      HttpStatus.BAD_GATEWAY
    );
  }
}

export class ServiceUnavailableRpcError extends BaseRpcError {
  constructor(service: string) {
    super(
      `${service} service is temporarily unavailable`,
      'SERVICE_UNAVAILABLE',
      HttpStatus.SERVICE_UNAVAILABLE
    );
  }
}

export class BadRequestRpcError extends BaseRpcError {
  constructor(message = 'Bad request') {
    super(message, 'BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}

export class TooManyRequestsRpcError extends BaseRpcError {
  constructor(message = 'Too many requests') {
    super(message, 'TOO_MANY_REQUESTS', HttpStatus.TOO_MANY_REQUESTS);
  }
}
