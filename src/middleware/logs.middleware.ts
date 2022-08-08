import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { AdminLogService } from '../service/admin/log';
import { CreateLogDTO } from '../dto/admin/log';

/**
 * 日志中间件
 */
@Middleware()
export class LogMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const logService = await ctx.requestContext.getAsync(AdminLogService);
      const { userId, name } = ctx.state.user || {};
      const path = ctx.url.split('?')[0];
      const input =
        ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body;

      const log: CreateLogDTO = {
        userId,
        name,
        path,
        input: input ? JSON.stringify(input) : '',
        method: ctx.req.method,
        ip: ctx.request.ip,
      };
      logService.createAdminLog(log);
      await next();
    };
  }
}
