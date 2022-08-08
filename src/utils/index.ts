import { Config, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as meeko from 'meeko';

@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {
  @Config('jwt')
  jwtConfig;

  @Inject()
  jwt: JwtService;

  async jwtSign(sign: any, options?: any): Promise<string> {
    return await this.jwt.sign(sign, options);
  }

  jwtVerify(token: string, options?: any): any {
    return this.jwt.verify(token, this.jwtConfig.secret, options);
  }

  /**
   * 密文转hash
   * @method Helper#bhash
   * @param {String} str 需要加密的内容
   * @returns {String} 密文
   */
  bhash(str: string) {
    return bcrypt.hashSync(str, 10);
  }

  /**
   * hash是否正确
   * @param {String} str 需要匹配的内容
   * @param {String} hash hash值
   * @returns {Boolean} 是否匹配
   */
  bcompare(str: string, hash: string) {
    return bcrypt.compareSync(str, hash);
  }

  /**
   * 对比两个数组差异
   * @method Helper#arrayDiff
   * @param {(string | number)[]} arrA 数组A
   * @param {(string | number)[]} arrB 数组B
   * @returns {[increase:  (string | number)[], decrease:  (string | number)[]]} [increase, decrease]
   */
  arrayDiff(arrA: (string | number)[], arrB: (string | number)[]) {
    const intersect = meeko.array.intersect(arrA, arrB);
    const increase = meeko.array.except(arrA, intersect);
    const decrease = meeko.array.except(arrB, intersect);
    return [increase, decrease];
  }
}
