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
import { AdminUserService } from '../../service/admin/user';
import {
  QueryUserDTO,
  ShowUserDTO,
  CreateUserDTO,
  UpdateUserDTO,
  RemoveUserDTO,
} from '../../dto/admin/user';
import MyError from '../../error/my-error';
import { AdminRoleService } from '../../service/admin/role';
import { AdminPermissionService } from '../../service/admin/permission';
import { BaseController } from '../base';
import { Utils } from '../../utils';
import { ApiBearerAuth, ApiQuery } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

@ApiBearerAuth()
@Controller('/admin/user', {
  tagName: '管理员管理',
  description: '包含管理员的增、删、改、查',
})
export class AdminUserController extends BaseController {
  @Inject('adminUserService')
  service: AdminUserService;

  @Inject('adminRoleService')
  roleService: AdminRoleService;

  @Inject('adminPermissionService')
  permissionService: AdminPermissionService;

  @Inject()
  utils: Utils;

  @Get('/query', {
    summary: '获取管理员列表',
    description: '分页接口，查询管理员列表',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async query(@Query() query: QueryUserDTO) {
    const result = await this.service.queryAdminUser(query);
    this.success(result);
  }

  @Get('/show', {
    summary: '获取单个管理员详情',
    description: '获取管理员的详细信息，包括其关联的对象',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async show(@Query() query: ShowUserDTO) {
    const result = await this.service.getAdminUserById(query.id);
    assert.ok(result, new MyError('管理员不存在，请检查', 400));
    this.success(result);
  }

  @Post('/create', {
    summary: '创建管理员',
    description: '会校验要关联的角色和权限是否存在',
  })
  @Validate()
  async create(@Body() params: CreateUserDTO) {
    const { roles, permissions } = params;

    // 检查角色是否存在
    await this.roleService.checkRoleExists(roles);

    // 检查权限是否存在
    await this.permissionService.checkPermissionExists(permissions);

    const passwordHash = this.utils.bhash(params.password);

    const result = await this.service.createAdminUser({
      ...params,
      password: passwordHash,
    });

    this.success(result, null, 201);
  }

  @Patch('/update', {
    summary: '更新管理员数据',
    description: '可更新管理员一个或多个字段',
  })
  @Validate()
  async update(@Body() params: UpdateUserDTO) {
    const { roles, permissions } = params;

    // 检查角色是否存在
    await this.roleService.checkRoleExists(roles);

    // 检查权限是否存在
    await this.permissionService.checkPermissionExists(permissions);

    const { affected } = await this.service.updateAdminUser(params);
    assert.ok(affected, new MyError('更新失败，请检查', 400));

    this.success(params, '更新成功');
  }

  @Del('/remove', {
    summary: '删除管理员',
    description: '关联关系表不会删除其中的内容，可以同时删除多个管理员',
  })
  @Validate()
  async remove(@Body() params: RemoveUserDTO) {
    const isAdmin = await this.service.checkIsAdmin(params.ids);
    console.log(isAdmin);
    assert.ok(isAdmin === 0, new MyError('admin用户不能删除', 400));

    // 检查管理员是否存在
    await this.service.checkUserExists(params.ids);

    const result = await this.service.removeAdminUserByIds(params.ids);
    assert.ok(result.affected, new MyError('删除失败，请检查', 400));

    this.success(result, '删除成功');
  }
}
