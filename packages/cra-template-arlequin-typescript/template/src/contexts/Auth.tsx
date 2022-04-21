import { createContext, useState, useContext } from 'react';

import { authHelper } from '@app/helpers/auth.helper';
import authInfo from '@app/services/auth.service';
import { authStorage } from '@app/services/localstorage.service';
import { AuthUserType, LoginStatus } from '@typings/arlequin';
import { AuthContextType, RequestLogin } from '@typings/arlequin/api';

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userInfo = authStorage.getItem();
  const [user, setUser] = useState<AuthUserType | undefined>(userInfo);

  const signin = async (payload: RequestLogin) => {
    await authHelper.signin(payload);
    if (authInfo.user) {
      setUser(authInfo.user);
    }
    return authHelper.check();
  };

  const signout = () => {
    authHelper.signout();
    setUser(undefined);
  };

  const check = () => {
    const loginStatus = authHelper.check();
    if (loginStatus === LoginStatus.LOGIN) {
      setUser(authInfo.user);
    } else {
      setUser(undefined);
    }
    return loginStatus;
  };

  const value = { user, signin, signout, check };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
