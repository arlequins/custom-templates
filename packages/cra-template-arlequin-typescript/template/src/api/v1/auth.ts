import { AxiosResponse } from 'axios';

import { authApiV1 } from '@app/services/api.service';
import { EndpointsEnum, RequestLogin, ResponseLogin } from '@typings/arlequin/api';

export const postUserInfo = async (payload: RequestLogin): Promise<ResponseLogin> => {
  const response: AxiosResponse<ResponseLogin> = await authApiV1.post(EndpointsEnum.LOGIN, {
    ...payload,
  });

  return response.data;
};
