import * as assert from 'assert';

import {
  Controller,
  Get,
  Inject,
  Query,
  Post,
  Patch,
  Del,
  Body,
} from '@midwayjs/decorator';
import { AdminRoleService } from '../../service/admin/role';
import { AdminPermissionService } from '../../service/admin/permission';
import {
  QueryRoleDTO,
  ShowRoleDTO,
  CreateRoleDTO,
  UpdateRoleDTO,
  RemoveRoleDTO,
} from '../../dto/admin/role';
import MyError from '../../error/my-error';
import { BaseController } from '../base';
import { ApiBearerAuth, ApiQuery } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

@ApiBearerAuth()
@Controller('/admin/role', {
  tagName: '角色管理',
  description: '包含角色的增、删、改、查',
})
export class AdminRoleController extends BaseController {
  @Inject('adminRoleService')
  service: AdminRoleService;

  @Inject('adminPermissionService')
  permissionService: AdminPermissionService;

  @Get('/query', {
    summary: '获取角色列表',
    description: '分页接口，查询角色列表',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async query(@Query() query: QueryRoleDTO) {
    const result = await this.service.queryAdminRole(query);
    this.success(result);
  }

  @Get('/show', {
    summary: '获取单个角色详情',
    description: '获取角色的详细信息，包括其关联的对象',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async show(@Query() query: ShowRoleDTO) {
    const result = await this.service.getAdminRoleById(query.id);
    assert.ok(result, new MyError('角色不存在，请检查', 400));
    this.success(result);
  }

  @Post('/create', {
    summary: '创建角色',
    description: '会校验关联的权限是否存在',
  })
  @Validate()
  async create(@Body() params: CreateRoleDTO) {
    // 检查角色是否存在
    await this.permissionService.checkPermissionExists(params.permissions);

    const result = await this.service.createAdminRole(params);

    this.success(result, null, 201);
  }

  @Patch('/update', {
    summary: '更新角色数据',
    description: '可更新角色一个或多个字段',
  })
  @Validate()
  async update(@Body() params: UpdateRoleDTO) {
    // 检查角色是否存在
    await this.service.checkRoleExists([params.id]);

    const { affected } = await this.service.updateAdminRole(params);
    assert.ok(affected, new MyError('更新失败，请检查', 400));

    this.success(params, '更新成功');
  }

  @Del('/remove', {
    summary: '删除角色',
    description: '关联关系表不会删除其中的内容，可以同时删除多个角色',
  })
  @Validate()
  async remove(@Body() params: RemoveRoleDTO) {
    // 检查角色是否存在
    await this.service.checkRoleExists(params.ids);

    const total = await this.service.removeAdminRoleByIds(params.ids);
    assert.ok(total, new MyError('删除失败，请检查', 400));

    this.success(total, '删除成功');
  }
}
