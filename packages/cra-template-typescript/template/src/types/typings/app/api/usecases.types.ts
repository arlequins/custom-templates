import { RequestLogin, ResponseLogin } from '@typings/app/api/index.types';
import { AuthUserType, LoginStatus, PermissionEnum, RoleEnum } from '@typings/app/index.types';

export interface ResultLogin extends ResponseLogin {
  permissions?: PermissionEnum[];
  roles?: RoleEnum[];
}

export interface AuthContextType {
  user?: AuthUserType;
  signin: (payload: RequestLogin) => Promise<LoginStatus>;
  signout: () => void;
  check: () => LoginStatus;
}
