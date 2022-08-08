import * as assert from 'assert';

import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, Like, In } from 'typeorm';
import { AdminLogModel } from '../../model/admin/admin-logs';
import { QueryLogDTO, CreateLogDTO } from '../../dto/admin/log';
import MyError from '../../error/my-error';

@Provide()
export class AdminLogService {
  @InjectEntityModel(AdminLogModel)
  adminLogModel: Repository<AdminLogModel>;

  /**
   * 分页查询日志列表
   * @param {QueryLogDTO} params
   */
  async queryAdminLog(params: QueryLogDTO) {
    const { pageSize, current, sorter, ...filter } = params;
    const where: any = {};
    const order: any = { id: 'DESC' };

    // 排序方式
    if (sorter) {
      const [column, sort] = sorter.split('_');
      order[column] = sort.split('end')[0].toUpperCase();
    }

    // 模糊匹配id
    if (filter.id) {
      where.id = Like(filter.id);
    }

    // 模糊匹配用户ID
    if (filter.userId) {
      where.userId = Like(`${filter.userId}%`);
    }

    // 模糊匹配路径
    if (filter.path) {
      where.path = Like(`${filter.path}%`);
    }

    // 模糊匹配请求方式
    if (filter.method) {
      where.method = Like(`${filter.method}%`);
    }

    const [list, total] = await this.adminLogModel.findAndCount({
      where,
      order,
      take: pageSize,
      skip: pageSize * (current - 1),
    });

    return {
      current,
      pageSize,
      total,
      list,
    };
  }

  /**
   * 创建日志
   * @param {CreateLogDTO} params 日志参数
   */
  async createAdminLog(params: CreateLogDTO) {
    let logs = new AdminLogModel();
    logs = this.adminLogModel.merge(logs, params);
    const created = await this.adminLogModel.save(logs);
    return created;
  }

  /**
   * 批量删除多条日志数据(忽略关联表的数据)
   * @param {string[]} ids 日志id
   */
  async removeAdminLogByIds(ids: string[]) {
    return (
      this.adminLogModel
        .createQueryBuilder()
        // .softDelete() // 软删除例子
        .delete()
        .where({
          id: In(ids),
        })
        .execute()
    );
  }

  /**
   * 检查日志是否存在于数据库，自动抛错
   * @param {string[]} ids 日志id
   */
  async checkLogExists(ids: string[] = []) {
    const count = await this.adminLogModel.count({
      where: {
        id: In(ids),
      },
    });

    assert.deepStrictEqual(
      count,
      ids.length,
      new MyError('日志不存在，请检查', 400)
    );
  }
}
