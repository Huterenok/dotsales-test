import { CreateUserRequest, UpdateUserRequest } from '../dto';

export const updateUser = async (
  body: UpdateUserRequest[],
  accessToken: string,
): Promise<Response> => {
  return await fetch(process.env.API_URL + 'contacts', {
    body: JSON.stringify(body),
    method: 'PATCH',
    headers: {
      Authorization: accessToken,
      'Content-type': 'application/json',
    },
  });
};

export const createUser = async (
  body: CreateUserRequest[],
  accessToken: string,
): Promise<Response> => {
  return await fetch(process.env.API_URL + 'contacts', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      Authorization: accessToken,
      'Content-type': 'application/json',
    },
  });
};

export const queryUser = async (
  query: unknown,
  accessToken: string,
): Promise<Response> => {
  return await fetch(process.env.API_URL + `contacts?query=${query}`, {
    headers: {
      Authorization: accessToken,
      'Content-type': 'application/json',
    },
  });
};
