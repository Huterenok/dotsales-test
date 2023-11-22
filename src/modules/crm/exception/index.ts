import { HttpException, HttpStatus } from '@nestjs/common';

import { CreateUserDto, QueryUserDto, UpdateUserDto } from '../dto';

export class QueryUserError extends HttpException {
  constructor(data: QueryUserDto) {
    super(`Cannot find user by ${data} data`, HttpStatus.NOT_FOUND);
  }
}

export class CreateUserError extends HttpException {
  constructor(data: CreateUserDto) {
    super(`Cannot create  user with ${data} data`, HttpStatus.BAD_REQUEST);
  }
}

export class UpdateUserError extends HttpException {
  constructor(data: UpdateUserDto) {
    super(`Cannot update  user with ${data} data`, HttpStatus.BAD_REQUEST);
  }
}
export class CreateDealError extends HttpException {
  constructor(response: string = 'Deal cannot be created') {
    super(response, HttpStatus.BAD_REQUEST);
  }
}

export class RefreshTokensError extends HttpException {
  constructor(response: string = 'Error while authorization on crm') {
    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
