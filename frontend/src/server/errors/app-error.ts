import { ErrorCode } from './error-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: any;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    code = ErrorCode.INTERNAL_SERVER_ERROR,
    details?: any,
    isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(entity = 'Resource', details?: any) {
    super(`${entity} not found`, 404, ErrorCode.ENTITY_NOT_FOUND, details);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 503, ErrorCode.DATABASE_QUERY_ERROR, details);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, ErrorCode.INVALID_INPUT, details);
  }
}
