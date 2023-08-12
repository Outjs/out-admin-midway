import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as orm from '@midwayjs/typeorm';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';``
import * as passport from '@midwayjs/passport';
import * as redis from '@midwayjs/redis';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import { LogMiddleware } from './middleware/logs.middleware';

@Configuration({
  imports: [
    orm,
    koa,
    jwt,
    redis,
    validate,
    passport,
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([
      ReportMiddleware,
      JwtPassportMiddleware,
      LogMiddleware,
    ]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
