import { ZodError } from 'zod';

export class HttpException extends Error {
  status: number;
  errors?: unknown[];

  constructor(message: string = 'HTTP Exception') {
    super(message);
    this.errors = undefined;
    this.stack = undefined;
    this.status = 500;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request', errors: unknown[] = []) {
    super(message);
    this.stack = undefined;
    this.errors = errors;
    this.status = 400;
  }
}

export class ZodBadRequestException extends BadRequestException {
  constructor(error: ZodError) {
    super('Validation failed', error.issues);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(message);
    this.stack = undefined;
    this.status = 404;
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.stack = undefined;
    this.status = 401;
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(message);
    this.stack = undefined;
    this.status = 403;
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflict') {
    super(message);
    this.stack = undefined;
    this.status = 409;
  }
}

export class UnprocessableEntity extends HttpException {
  constructor(message: string = 'Unprocessable Entity') {
    super(message);
    this.stack = undefined;
    this.status = 422;
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.stack = undefined;
    this.status = 500;
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string = 'Service Unavailable') {
    super(message);
    this.stack = undefined;
    this.status = 503;
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message: string = 'Gateway Timeout') {
    super(message);
    this.stack = undefined;
    this.status = 504;
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message: string = 'Too Many Requests') {
    super(message);
    this.stack = undefined;
    this.status = 429;
  }
}
