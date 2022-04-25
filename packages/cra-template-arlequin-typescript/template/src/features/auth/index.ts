import { postUserInfo } from '@app/api/v1/index.api';
import authInfo from '@app/services/auth.service';
import { authStorage } from '@app/services/localstorage.service';
import { RequestLogin } from '@typings/app/api/index.types';
import { ResultLogin } from '@typings/app/api/usecases.types';
import { LoginStatus } from '@typings/app/index.types';

const makeExpireTimestamp = (expires: number) => {
  const currentTimestamp = new Date().getTime();
  const expiresTimestamp = currentTimestamp + expires * 1000;
  return new Date(expiresTimestamp).getTime();
};

export const authHelper = {
  signin: async (payload: RequestLogin) => {
    const info: ResultLogin = await postUserInfo(payload);
    authInfo.user = {
      username: info.username,
      expiresTimestamp: makeExpireTimestamp(info.expiresIn),
      expires: info.expiresIn,
      accessToken: info.accessToken,
      refreshToken: info.refreshToken,
      permissions: info.permissions ?? [],
      roles: info.roles ?? [],
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
