import { Controller, Get, Inject } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Controller('/', {
  tagName: '默认的接口',
  description: '包含连通性接口、鉴权验证接口',
})
export class HomeController {
  @Inject()
  jwt: JwtService;

  @Get('/')
  async home() {
    const ret = 'Hello Midwayjs!';
    return ret;
  }

  /* @Get('/ping')
  async ping(ctx: Context) {
    ctx.body = `OK, runtime is: Node.js ${process.version}`;
  }

  @Get('/genid')
  genId(): string {
    return this.koid.idGenerator.toString();
  }

  genIdHex(): string {
    return this.koid.nextHex;
  } */
}
