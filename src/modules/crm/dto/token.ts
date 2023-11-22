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
