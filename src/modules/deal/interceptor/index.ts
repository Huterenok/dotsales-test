import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { ValidationError } from 'config/validation';

@Injectable()
export class CreateDealInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    const errors = this.validateRequestBody(body);
    if (errors.length) {
      throw new ValidationError(errors);
    }

    return next.handle();
  }

  private validateRequestBody(body: any): string[] {
    const errors = [];
    if (typeof body.email != 'string' || body.email.length == 0) {
      errors.push({
        field: 'email',
        message: 'Email is required and must be valid',
      });
    }
    if (typeof body.name != 'string' || body.name.length == 0) {
      errors.push({
        field: 'Name',
        message: 'Name is required and must be valid',
      });
    }
    if (typeof body.phone != 'string' || body.phone.length == 0) {
      errors.push({
        field: 'phone',
        message: 'Phone is required and must be valid',
      });
    }
    return errors;
  }
}
