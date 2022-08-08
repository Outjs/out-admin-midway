import { Provide, Inject, Config } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { JwtService } from '@midwayjs/jwt';
import { RedisService } from '@midwayjs/redis';
import { Repository } from 'typeorm';
import { AdminUserModel } from '../model/admin/admin-user';
import { Utils } from '../utils';

@Provide()
export class AuthService {
  @Inject()
  private utils: Utils;

  @Inject()
  jwt: JwtService;

  @Config('jwt')
  jwtConfig: { secrect: any; expiresIn: string | number };

  @InjectEntityModel(AdminUserModel)
  private adminUserModel: Repository<AdminUserModel>;

  @Inject()
  private redisService: RedisService;

  /**
   * 生成Token(会缓存到Redis中)
   * @param {AdminUser} data 保存的数据
   * @returns {String} 生成的Token字符串
   */
  async createAdminUserToken(data: AdminUserModel): Promise<string> {
    const token: any = this.utils.jwtSign({ id: data.id, name: data.name });
    console.log(this.jwtConfig.secrect, token);
    await this.redisService.set(
      `admin:accessToken:${data.id}`,
      token,
      'EX',
      this.jwtConfig.expiresIn
    );
    return token;
  }

  /**
   * 获取管理员Redis Token（弃用）
   * @param {String} id 管理员id
   * @returns {String} Redis中的Token
   */
  async getAdminUserTokenById(id: string): Promise<string> {
    return this.redisService.get(`admin:accessToken:${id}`);
  }

  /**
   * 移除管理员Redis Token
   * @param {String} id 管理员id
   * @returns {number} 变更的数量
   */
  async removeAdminUserTokenById(id: string): Promise<number> {
    return this.redisService.del(`admin:accessToken:${id}`);
  }

  /**
   * 根据登录名查找管理员
   * @param {String} username 登录名
   * @returns {AdminUserModel | null} 承载管理员的 Promise 对象
   */
  async getAdminUserByUserName(username: string): Promise<AdminUserModel> {
    const user = await this.adminUserModel.findOne({
      relations: ['permissions', 'roles'],
      where: {
        username,
      },
    });
    return user;
  }

  /**
   * 读取Redis缓存中的管理员信息(弃用)
   * @param {String} id
   * @returns {AdminUserModel} 管理员信息
   */
  public async getAdminUserById(id: string): Promise<AdminUserModel> {
    const userinfo = (await this.redisService.get(
      `admin:userinfo:${id}`
    )) as string;
    return JSON.parse(userinfo) as AdminUserModel;
  }

  /**
   * 缓存管理员
   * @param {AdminUserModel} data 管理员数据
   * @returns {OK | null} 缓存处理结果
   */
  async cacheAdminUser(data: AdminUserModel): Promise<'OK' | null> {
    const {
      id,
      username,
      name,
      roles,
      permissions,
      avatar,
      createdAt,
      updatedAt,
    } = data;

    const userinfo = {
      id,
      username,
      name,
      avatar,
      roles,
      permissions,
      createdAt,
      updatedAt,
    };

    return this.redisService.set(
      `admin:userinfo:${userinfo.id}`,
      JSON.stringify(userinfo),
      'EX',
      this.jwtConfig.expiresIn
    );
  }

  /**
   * 清理管理员缓存数据
   * @param {String} id 管理员id
   * @returns {number} 缓存处理结果
   */
  async cleanAdminUserById(id: string): Promise<number> {
    return this.redisService.del(`admin:userinfo:${id}`);
  }

  /**
   * 使用帐号密码，本地化登录
   * @param {Object} params 包涵username、password等参数
   * @returns {AdminUserModel | null} 承载管理员的Promise对象
   */
  async localHandler(params: {
    username: string;
    password: string;
  }): Promise<AdminUserModel | null> {
    // 获取管理员函数
    const getAdminUser = (username: string) => {
      return this.getAdminUserByUserName(username);
    };

    // 查询管理员是否在数据库中
    const existAdmiUser = await getAdminUser(params.username);
    // 管理员不存在
    if (!existAdmiUser) {
      return null;
    }
    // 匹配密码
    const passhash = existAdmiUser.password;
    const equal = this.utils.bcompare(params.password, passhash);
    if (!equal) {
      return null;
    }

    // 通过验证
    return existAdmiUser;
  }
}
