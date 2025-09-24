/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { DrizzleError, DrizzleQueryError } from 'drizzle-orm';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { ZodError } from 'zod';

import { Message } from '~/common/types/response';

import { HttpException } from './error';

type ErrorConstructor<T extends Error = Error> = new (...args: any[]) => T;
type ExceptionHandler<T = any> = (e: T) => {
  status: number;
  message: unknown;
  error: unknown;
};

export const handlers = new Map<ErrorConstructor, ExceptionHandler>([
  [
    DrizzleQueryError,
    (e: DrizzleQueryError) => {
      console.log('DrizzleQueryError: ', e.message);
      return {
        status: 401,
        message: Message.DATABASE_QUERY_FAILED,
        error: e.message,
      };
    },
  ],
  [
    ZodError,
    (e: ZodError) => {
      console.log('ZodError: ', e.issues);
      return {
        status: 422,
        message: e.issues.map((issue) => issue.message),
        error: e.issues,
      };
    },
  ],
  [
    NotBeforeError,
    (e: NotBeforeError) => {
      console.log('NotBeforeError: ', e.message);
      return {
        status: 401,
        message: Message.TOKEN_EXPIRED,
        error: e.message,
      };
    },
  ],
  [
    TokenExpiredError,
    (e: TokenExpiredError) => {
      console.log('TokenExpiredError: ', e.message);
      return {
        status: 401,
        message: Message.TOKEN_EXPIRED,
        error: e.message,
      };
    },
  ],
  [
    JsonWebTokenError,
    (e: JsonWebTokenError) => {
      console.log('JsonWebTokenError: ', e.message);
      return {
        status: 401,
        message: Message.TOKEN_MALFORMED,
        error: e.message,
      };
    },
  ],

  [
    DrizzleError,
    (e: DrizzleError) => {
      console.log('DrizzleError: ', e.message);
      return {
        status: 422,
        message: Message.ENTITY_NOT_FOUND,
        error: e.message,
      };
    },
  ],
  [
    HttpException,
    (e: HttpException) => {
      console.log('HttpException: ', e.message);
      return {
        status: e.status,
        message: e.message,
        error: e.errors,
      };
    },
  ],
]);
