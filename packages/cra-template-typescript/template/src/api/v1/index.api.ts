import { AxiosResponse } from 'axios';

import { apiV1 } from '@app/services/api.service';
import { EndpointsEnum, RequestLogin, ResponseLogin } from '@typings/app/api/index.types';
import { ResultLogin } from '@typings/app/api/usecases.types';
import { PermissionEnum } from '@typings/app/index.types';

export const postUserInfo = async (payload: RequestLogin): Promise<ResultLogin> => {
  const response: AxiosResponse<ResponseLogin> = await apiV1.post(EndpointsEnum.LOGIN, {
    ...payload,
  });

  return {
    ...response.data,
    roles: [response.data.scope],
    // temp for permissions
    permissions: [PermissionEnum.DASHBOARD],
  };
};
