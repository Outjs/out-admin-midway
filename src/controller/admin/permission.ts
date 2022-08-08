import * as assert from 'assert';

import {
  Controller,
  Get,
  Inject,
  Query,
  Post,
  Del,
  Patch,
  Body,
} from '@midwayjs/decorator';
import { AdminRoleService } from '../../service/admin/role';
import { AdminPermissionService } from '../../service/admin/permission';
import {
  QueryPermDTO,
  CreatePermDTO,
  UpdatePermDTO,
  ShowPermDTO,
  RemovePermDTO,
} from '../../dto/admin/permission';
import MyError from '../../error/my-error';
import { BaseController } from '../base';
import { ApiBearerAuth, ApiQuery } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

@ApiBearerAuth()
@Controller('/admin/permission', {
  tagName: '权限管理',
  description: '包含权限的增、删、改、查',
})
export class AdminPermissionController extends BaseController {
  @Inject('adminPermissionService')
  service: AdminPermissionService;

  @Inject('adminRoleService')
  roleService: AdminRoleService;

  @Get('/query', {
    summary: '获取权限列表',
    description: '分页接口，查询权限列表',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async query(@Query() query: QueryPermDTO) {
    const result = await this.service.queryAdminPermission(query);
    this.success(result);
  }

  @Get('/show', {
    summary: '获取单个权限详情',
    description: '获取权限的详细信息，包括其关联的对象',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async show(@Query() query: ShowPermDTO) {
    const result = await this.service.getAdminPermissionById(query.id);
    assert.ok(result, new MyError('权限不存在，请检查', 400));
    this.success(result);
  }

  @Validate()
  @Post('/create', {
    summary: '创建权限',
    description: '',
  })
  async create(@Body() params: CreatePermDTO) {
    const result = await this.service.createAdminPermission(params);

    this.success(result, null, 201);
  }

  @Validate()
  @Patch('/update', {
    summary: '更新权限数据',
    description: '可更新权限一个或多个字段',
  })
  async update(@Body() params: UpdatePermDTO) {
    // 检查权限是否存在
    await this.service.checkPermissionExists([params.id]);

    const { affected } = await this.service.updateAdminPermission(params);
    assert.ok(affected, new MyError('更新失败，请检查', 400));

    this.success(params, '更新成功');
  }

  @Validate()
  @Del('/remove', {
    summary: '删除权限',
    description: '关联关系表不会删除其中的内容，可以同时删除多个权限',
  })
  async remove(@Body() params: RemovePermDTO) {
    // 检查权限是否存在
    await this.service.checkPermissionExists(params.ids);

    const total = await this.service.removeAdminPermissionByIds(params.ids);
    assert.ok(total, new MyError('删除失败，请检查', 400));

    this.success(total, '删除成功');
  }
}
