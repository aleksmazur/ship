import { tokenService } from 'resources/token';

import { AppKoaContext } from 'types';

import cookieHelper from './auth.helper';

const setTokens = async (ctx: AppKoaContext, userId: string, isShadow?: boolean) => {
  const { accessToken } = await tokenService.createAuthTokens({ userId, isShadow });

  if (accessToken) {
    cookieHelper.setTokenCookies({
      ctx,
      accessToken,
    });
  }
};

const unsetTokens = async (ctx: AppKoaContext) => {
  cookieHelper.unsetTokenCookies(ctx);
};

export default {
  setTokens,
  unsetTokens,
};
