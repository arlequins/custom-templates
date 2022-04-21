import { postUserInfo } from '@app/api/v1/auth';
import authInfo from '@app/services/auth.service';
import { authStorage } from '@app/services/localstorage.service';
import { LoginStatus, PermissionEnum, RoleEnum } from '@typings/arlequin';
import { RequestLogin } from '@typings/arlequin/api';

// temp
const DUMMY_USER = {
  roles: [RoleEnum.SUPER_ADMIN],
  permissions: [PermissionEnum.DASHBOARD],
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  expires: 10, // 10 secs
};

const makeExpireTimestamp = (expires: number) => {
  const currentTimestamp = new Date().getTime();
  const expiresTimestamp = currentTimestamp + expires * 1000;
  return new Date(expiresTimestamp).getTime();
};

export const authHelper = {
  signin: async (payload: RequestLogin) => {
    const info = await postUserInfo(payload);
    authInfo.user = {
      username: payload.username,
      expiresTimestamp: makeExpireTimestamp(info.expiresIn), // 10 secs
      ...DUMMY_USER,
    };
    authInfo.isAuthenticated = true;

    authStorage.setItem(authInfo.user);
  },
  signout: () => {
    authInfo.user = undefined;
    authInfo.isAuthenticated = false;

    authStorage.removeItem();
  },
  check: () => {
    const userInfo = authStorage.getItem();

    if (!userInfo) {
      return LoginStatus.NOT_LOGIN;
    }

    const currentTimestamp = new Date().getTime();
    const expiresTimestamp = userInfo.expiresTimestamp ?? -1;
    const isExpired = currentTimestamp > expiresTimestamp;
    if (isExpired) {
      authInfo.user = undefined;
      authInfo.isAuthenticated = false;

      authStorage.removeItem();
      return LoginStatus.EXPIRES;
    } else {
      authInfo.user = userInfo;
      authInfo.isAuthenticated = true;

      return LoginStatus.LOGIN;
    }
  },
};
