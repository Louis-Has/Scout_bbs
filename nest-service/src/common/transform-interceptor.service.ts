import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  error: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const now = Date.now();
    return next.handle().pipe(
      map((data) => ({ success: true, data, error: '' })),
      // catchError((err) => throwError(new BadGatewayException())),
      tap(() => {
        console.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}
