import { AuthUserType, LoginStatus } from '@typings/arlequin';

export const enum ApiVersionEnum {
  V1 = 'v1',
  V2 = 'v2',
}

export const enum EndpointsEnum {
  LOGIN = 'login',
  LOGOUT = 'logout',
  RESET_PASSWORD = 'reset-password',
  REFRESH_TOKEN = 'refresh-token',
  USERS = 'users',
}

export interface RequestLogin {
  grantType: string;
  username: string;
  password: string;
}

export interface ResponseLogin {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken: string;
  scope: string;
  tokenType: string;
}

export interface AuthContextType {
  user?: AuthUserType;
  signin: (payload: RequestLogin) => Promise<LoginStatus>;
  signout: () => void;
  check: () => LoginStatus;
}
