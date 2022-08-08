import * as assert from 'assert';

import { Controller, Get, Post, Inject, Body } from '@midwayjs/decorator';
import { BaseController } from './base';
import { AuthService } from '../service/auth';
import { LoginDTO } from '../dto/auth';
import MyError from '../error/my-error';
import { ApiBearerAuth } from '@midwayjs/swagger';

@ApiBearerAuth()
@Controller('/auth', {
  tagName: '管理员登录授权',
  description: '包含管理员授权登录、获取信息等接口 ',
})
export class AuthController extends BaseController {
  @Inject('authService')
  service: AuthService;

  @Post('/login')
  async login(@Body() params: LoginDTO): Promise<void> {
    // 后续可能有多种登录方式
    const existAdmiUser = await this.service.localHandler(params);

    // 检查管理员存在
    assert.ok(existAdmiUser, new MyError('管理员不存在', 400));

    // 生成Token
    const token = await this.service.createAdminUserToken(existAdmiUser);

    // 缓存管理员数据
    await this.service.cacheAdminUser(existAdmiUser);

    // TODO: 调用 rotateCsrfSecret 刷新管理员的 CSRF token
    // ctx.rotateCsrfSecret()

    this.success({
      token,
      currentAuthority: 'admin',
      status: 'ok',
      type: 'account',
    });
  }

  @Post('/logout')
  async logout(): Promise<void> {
    if (this.ctx.state.user) {
      const { id } = this.ctx.state.user;
      // 清理管理员数据和token
      await this.service.removeAdminUserTokenById(id);
      await this.service.cleanAdminUserById(id);

      this.success({});
    }
  }

  @Get('/currentUser')
  async currentUser(): Promise<void> {
    if (this.ctx.state.user) {
      const { id } = this.ctx.state.user;
      const currentUser = await this.service.getAdminUserById(id);
      this.success(currentUser);
    }
  }
}
