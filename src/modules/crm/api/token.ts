import { RefreshTokensRequest } from '../dto';

export const refreshTokens = async (
  body: RefreshTokensRequest,
): Promise<Response> => {
  return await fetch(process.env.CRM_URL + 'oauth2/access_token', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  });
};
