export interface CreateUserDto {
  name: string;
  email: string;
  phone: string;
}
export interface UpdateUserDto extends CreateUserDto {}
export interface QueryUserDto extends CreateUserDto {}

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
