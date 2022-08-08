import { Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

export abstract class BaseController {
  @Inject()
  protected ctx: Context;

  /**
   * 处理成功响应
   * @method Helper#success
   * @param {any} result Return data, Default null
   * @param {String} message Error message, Default '请求成功'
   * @param {Number} status Status code, Default '200'
   *
   * @example
   * ```js
   * ctx.success({}, null, 201);
   * ```
   */
  protected success(result = null, message = '请求成功', status = 200) {
    this.ctx.body = {
      message,
      code: status,
      data: result,
      success: status >= 200 && status < 300,
    };
    this.ctx.status = status;
  }

  /**
   * 处理成功响应
   * @method Helper#success
   * @param {any} result Return data, Default null
   * @param {String} message Error message, Default '请求成功'
   * @param {Number} status Status code, Default '200'
   *
   * @example
   * ```js
   * ctx.success({}, null, 201);
   * ```
   */
  protected list(result = null, message = '请求成功', status = 200) {
    this.ctx.body = {
      code: status,
      success: status === 200,
      message,
      ...result,
    };
    this.ctx.status = status;
  }
}
