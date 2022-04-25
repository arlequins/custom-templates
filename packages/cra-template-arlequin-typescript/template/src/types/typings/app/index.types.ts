export const enum PermissionEnum {
  DASHBOARD = 'dashboard',
  USERS_CREATE = 'users:create',
  USERS_READ = 'users:read',
  USERS_WRITE = 'users:write',
  USERS_DELETE = 'users:delete',
}

export const enum RoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

export const enum LoginStatus {
  NOT_LOGIN = 0,
  LOGIN = 1,
  EXPIRES = 2,
}

export interface ResponseAuthUserType {
  permissions: PermissionEnum[];
  roles: RoleEnum[];
  expires: number;
  username: string;
  accessToken: string;
  refreshToken?: string;
}

export interface AuthUserType extends ResponseAuthUserType {
  expiresTimestamp: number;
}

export interface AnyObjectType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
