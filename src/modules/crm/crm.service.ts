import { Injectable } from '@nestjs/common';

import { User } from 'model/user';

import {
  RefreshTokensResponse,
  RefreshTokensRequest,
  CreateDealRequest,
  CreateUserRequest,
  QueryUserDto,
  CreateUserDto,
  QueryUserResponse,
  UpdateUserRequest,
  CreateUserResponse,
  UpdateUserResponse,
} from './dto';
import {
  CreateDealError,
  CreateUserError,
  QueryUserError,
  RefreshTokensError,
  UpdateUserError,
} from './exception';
import {
  createDeal,
  createUser,
  queryUser,
  updateUser,
  refreshTokens,
} from './api';

export interface ICrmService {
  createDeal(dto: User): Promise<void>;
  queryUser(dto: QueryUserDto): Promise<User>;
  createUser(dto: QueryUserDto): Promise<number>;
  updateUser(dto: User): Promise<number>;
}

@Injectable()
export class CrmService implements ICrmService {
  private refreshToken: string;
  private accessToken: string;
  private expiresIn: number;

  constructor() {
    this.refreshTokens();
  }

  // Deal service.
  // In the future it can be separated to its own deal crm serivce
  async createDeal(dto: User): Promise<void> {
    this.shouldRefresh();

    const body: CreateDealRequest[] = [
      {
        name: 'Good bargain',
        created_by: 0,
        // custom_fields_values: [
        //   {
        //     field_id: Number(process.env.USER_EMAIL_FIELD_ID),
        //     values: [
        //       {
        //         value: dto.email,
        //       },
        //     ],
        //   },
        //   {
        //     field_id: Number(process.env.USER_PHONE_FIELD_ID),
        //     values: [
        //       {
        //         value: dto.phone,
        //       },
        //     ],
        //   },
        // ],
      },
    ];
    const res = await createDeal(body, this.accessToken);

    if (!res.ok) {
      console.log(await res.text());
      throw new CreateDealError();
    }
  }

  // User service
  // In the future it can be separated to its own user crm serivce
  async queryUser(dto: QueryUserDto): Promise<User> {
    this.shouldRefresh();

    const queryByPhone = await queryUser(dto.phone, this.accessToken);
    const queryByEmail = await queryUser(dto.email, this.accessToken);

    let res: QueryUserResponse;
    if (queryByPhone.status == 200) {
      res = await queryByPhone.json();
    } else if (queryByPhone.status == 200) {
      res = await queryByEmail.json();
    } else {
      throw new QueryUserError(dto);
    }
    return {
      id: res._embedded.contacts[0].id,
      name: res._embedded.contacts[0].name,
      email: res._embedded.contacts[0].custom_fields_values[0].values[0].value,
      phone: res._embedded.contacts[0].custom_fields_values[1].values[0].value,
    };
  }

  async createUser(dto: CreateUserDto): Promise<number> {
    this.shouldRefresh();

    const body: CreateUserRequest[] = [
      {
        name: dto.name,
        custom_fields_values: [
          {
            field_id: Number(process.env.USER_EMAIL_FIELD_ID),
            values: [
              {
                value: dto.phone,
              },
            ],
          },
          {
            field_id: Number(process.env.USER_PHONE_FIELD_ID),
            values: [
              {
                value: dto.email,
              },
            ],
          },
        ],
      },
    ];

    const res = await createUser(body, this.accessToken);

    if (!res.ok) {
      throw new CreateUserError(dto);
    }

    const data: CreateUserResponse = await res.json();
    return data._embedded.contacts[0].id;
  }

  async updateUser(dto: User): Promise<number> {
    this.shouldRefresh();

    const body: UpdateUserRequest[] = [
      {
        name: dto.name,
        id: dto.id,
        custom_fields_values: [
          {
            field_id: Number(process.env.USER_EMAIL_FIELD_ID),
            values: [
              {
                value: dto.email,
              },
            ],
          },
          {
            field_id: Number(process.env.USER_PHONE_FIELD_ID),
            values: [
              {
                value: dto.phone,
              },
            ],
          },
        ],
      },
    ];
    const res = await updateUser(body, this.accessToken);
    if (!res.ok) {
      throw new UpdateUserError(dto);
    }

    const data: UpdateUserResponse = await res.json();
    return data._embedded.contacts[0].id;
  }

  // Service token logic
  private async shouldRefresh() {
    if (new Date().getTime() > this.expiresIn) {
      await this.refreshTokens();
    }
  }

  private async refreshTokens() {
    const body: RefreshTokensRequest = {
      client_id: process.env.INTERGRATION_ID,
      client_secret: process.env.SECRET_KEY,
      grant_type: '',
      redirect_uri: process.env.REDIRECT_URL,
    };

    if (!this.refreshToken) {
      body.code = process.env.AUTHORIZATION_CODE;
      body.grant_type = 'authorization_code';
    } else {
      body.refresh_token = this.refreshToken;
      body.grant_type = 'refresh_token';
    }

    const res = await refreshTokens(body);

    // RefreshTokensError can be not handled in other handlers as it is cannot be
    // reinvoked again because authorization_code from crm server cannot be auto-given
    if (!res.ok) {
      throw new RefreshTokensError();
    }

    const data: RefreshTokensResponse = await res.json();
    this.refreshToken = 'Bearer ' + data.refresh_token;
    this.accessToken = 'Bearer ' + data.access_token;
    this.expiresIn = new Date().getTime() + data.expires_in;
  }
}
