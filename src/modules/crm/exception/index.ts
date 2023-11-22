import { HttpException, HttpStatus } from '@nestjs/common';

import { CreateUserDto, QueryUserDto, UpdateUserDto } from '../dto';

export class QueryUserError extends HttpException {
  constructor(data: QueryUserDto) {
    super(
      `Cannot find user by ${data.name} name, ${data.phone} phone, ${data.email} email`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class CreateUserError extends HttpException {
  constructor(data: CreateUserDto) {
    super(
      `Cannot create user with ${data.name} name, ${data.phone} phone, ${data.email} email`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UpdateUserError extends HttpException {
  constructor(data: UpdateUserDto) {
    super(
      `Cannot update user with ${data.name} name, ${data.phone} phone, ${data.email} email`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class CreateDealError extends HttpException {
  constructor() {
    super('Deal cannot be created', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class RefreshTokensError extends HttpException {
  constructor() {
    super('Error while authorization on crm', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
