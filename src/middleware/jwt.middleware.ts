// src/middleware/jwt.middleware.ts

import { Config, Middleware } from '@midwayjs/decorator';
import { PassportMiddleware } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import * as passport from 'passport';
import { Context } from '@midwayjs/koa';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions():
    | Promise<passport.AuthenticateOptions>
    | passport.AuthenticateOptions {
    return {};
  }

  @Config('koa')
  koaConfig: { globalPrefix: string };
  
  ignore(ctx: Context): boolean {
    return ctx.path === '/' || ctx.path === this.koaConfig.globalPrefix + '/auth/login';
  }
}
