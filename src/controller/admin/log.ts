import * as assert from 'assert';

import { Controller, Get, Inject, Query, Del, Body } from '@midwayjs/decorator';
import { AdminLogService } from '../../service/admin/log';
import { QueryLogDTO, RemoveLogDTO } from '../../dto/admin/log';
import MyError from '../../error/my-error';
import { BaseController } from '../base';
import { ApiBearerAuth, ApiQuery } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

@ApiBearerAuth()
@Controller('/admin/log', {
  tagName: '日志管理',
  description: '包含日志的增、删、改、查',
})
export class AdminLogController extends BaseController {
  @Inject('adminLogService')
  service: AdminLogService;

  @Get('/query', {
    summary: '获取日志列表',
    description: '分页接口，查询日志列表',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async query(@Query() query: QueryLogDTO) {
    const result = await this.service.queryAdminLog(query);
    this.success(result);
  }

  @Validate()
  @Del('/remove', {
    summary: '删除日志',
    description: '关联关系表不会删除其中的内容，可以同时删除多个日志',
  })
  async remove(@Body() params: RemoveLogDTO) {
    // 检查日志是否存在
    await this.service.checkLogExists(params.ids);

    const total = await this.service.removeAdminLogByIds(params.ids);
    assert.ok(total, new MyError('删除失败，请检查', 400));

    this.success(total, '删除成功');
  }
}
