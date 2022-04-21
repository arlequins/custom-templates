import ENV from '@app/constants/env.constants';
import AbstractApiService from '@app/services/abstract/AbstractApiService';
import { ApiVersionEnum, EndpointsEnum } from '@typings/arlequin/api';

class AuthApiV1Service extends AbstractApiService {
  constructor() {
    const ignoreAuthEndpoints = [EndpointsEnum.LOGIN];
    super(ENV.API_HOST, ApiVersionEnum.V1, ignoreAuthEndpoints);
  }
}

export const authApiV1 = new AuthApiV1Service().api;
