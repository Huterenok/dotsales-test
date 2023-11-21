import { CreateDealRequest } from '../dto';

export const createDeal = async (
  body: CreateDealRequest[],
  accessToken: string,
): Promise<Response> => {
  return await fetch(process.env.API_URL + 'leads', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      Authorization: accessToken,
      'Content-type': 'application/json',
    },
  });
};
