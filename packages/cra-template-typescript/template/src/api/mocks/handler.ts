// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { wrapCheckAuth } from '@app/api/mocks/helper';
import { SLASH } from '@app/constants/api.constants';
import ENV from '@app/constants/env.constants';
import { ApiVersionEnum, EndpointsEnum, RequestLogin, ResponseLogin } from '@typings/app/api/index.types';
import { RoleEnum } from '@typings/app/index.types';

export const handlers = [
  rest.post([ENV.API_HOST, ApiVersionEnum.V1, EndpointsEnum.LOGIN].join(SLASH), (req, res, ctx) => {
    const payload = req.body as RequestLogin;
    const response = {
      username: payload.username,
      accessToken: 'accessToken',
      expiresIn: 10,
      idToken: 'idToken',
      refreshToken: 'refreshToken',
      scope: RoleEnum.SUPER_ADMIN,
      tokenType: 'tokenType',
    } as ResponseLogin;

    return res(ctx.delay(1000), ctx.json(response), ctx.status(200));
  }),
  rest.post([ENV.API_HOST, ApiVersionEnum.V1, EndpointsEnum.RESET_PASSWORD].join(SLASH), (req, res, ctx) =>
    wrapCheckAuth(req, res, ctx, (req, res, ctx) => {
      const payload = req.body as any;
      const response = {
        ...payload,
      } as any;

      return res(ctx.delay(1000), ctx.json(response), ctx.status(200));
    })
  ),
];
