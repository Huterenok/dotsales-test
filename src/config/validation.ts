import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationError extends HttpException {
  constructor(errors: string[]) {
    super(errors, HttpStatus.BAD_REQUEST);
  }
}
