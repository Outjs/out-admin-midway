import { Catch,MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.status = err.status;
    // 所有的未分类错误会到这里
    return {
      status: err.status,
      success: false,
      message: err.message,
    };
  }
}
