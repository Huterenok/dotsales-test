export interface CreateUserDto {
  name: string;
  email: string;
  phone: string;
}
export interface UpdateUserDto extends CreateUserDto {}
export interface QueryUserDto extends CreateUserDto {}

export interface CreateDealRequest {
  name: string;
  created_by: number;
  // custom_fields_values: {
  //   field_id: number;
  //   values: { value: any }[];
  // }[];
}

export interface CreateUserRequest {
  name: string;
  custom_fields_values: {
    field_id: number;
    values: { value: any }[];
  }[];
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number;
}

export interface CreateUserResponse {
  _embedded: {
    contacts: { id: number }[];
  };
}
export interface UpdateUserResponse extends CreateUserResponse {}

export interface QueryUserResponse {
  _embedded: {
    contacts: {
      id: number;
      name: string;
      custom_fields_values: {
        field_id: number;
        values: { value: any }[];
      }[];
    };
  };
}

export interface RefreshTokensRequest {
  client_id: string;
  client_secret: string;
  grant_type: string;
  redirect_uri: string;

  code?: string;
  refresh_token?: string;
}

export interface RefreshTokensResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}
