import * as assert from 'assert';

import {
  Controller,
  Get,
  Inject,
  Query,
  Post,
  Patch,
  Body,
  Del,
} from '@midwayjs/decorator';
import { AdminMenuService } from '../../service/admin/menu';
import { AdminRoleService } from '../../service/admin/role';
import { AdminPermissionService } from '../../service/admin/permission';
import {
  CreateMenuDTO,
  OrderMenuMenuDTO,
  QueryMenuDTO,
  RemoveMenuDTO,
  ShowMenuDTO,
  UpdateMenuDTO,
} from '../../dto/admin/menu';
import MyError from '../../error/my-error';
import { BaseController } from '../base';
import { ApiBearerAuth, ApiQuery } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

@ApiBearerAuth()
@Controller('/admin/menu', {
  tagName: '菜单管理',
  description: '包含菜单的增、删、改、查、排序',
})
export class AdminMenuController extends BaseController {
  @Inject('adminMenuService')
  service: AdminMenuService;

  @Inject('adminRoleService')
  roleService: AdminRoleService;

  @Inject('adminPermissionService')
  permissionService: AdminPermissionService;

  @Get('/query', {
    summary: '获取菜单列表',
    description: '分页接口，获取菜单的列表',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async query(@Query() query: QueryMenuDTO) {
    const result = await this.service.queryAdminMenu(query);
    this.success(result);
  }

  @Get('/show', {
    summary: '获取单个菜单详情',
    description: '获取菜单的详细信息，包括其关联的对象',
  })
  @ApiQuery({
    name: 'query',
  })
  @Validate()
  async show(@Query() query: ShowMenuDTO) {
    const result = await this.service.getAdminMenuById(query.id);
    console.log(result);
    assert.ok(result, new MyError('菜单不存在，请检查', 400));
    this.success(result);
  }

  @Post('/create', {
    summary: '创建菜单',
    description: '会校验要关联角色和权限是否存在',
  })
  @Validate()
  async create(@Body() params: CreateMenuDTO) {
    // 检查角色是否存在
    await this.roleService.checkRoleExists(params.roles);

    // 检查权限是否存在
    await this.permissionService.checkPermissionExists(
      params.permission ? [params.permission] : []
    );
    const result = await this.service.createAdminMenu(params);

    this.success(result, null, 201);
  }

  @Patch('/update', {
    summary: '更新菜单数据',
    description: '可更新菜单一个或多个字段',
  })
  @Validate()
  async update(@Body() params: UpdateMenuDTO) {
    // 检查菜单是否存在
    await this.service.checkMenuExists([params.id]);

    // 检查角色是否存在
    await this.roleService.checkRoleExists(params.roles);

    // 检查权限是否存在
    await this.permissionService.checkPermissionExists(
      params.permission ? [params.permission] : []
    );

    // 父id为空，则设为默认值0
    params.parentId = params.parentId || '0';

    const { affected } = await this.service.updateAdminMenu(params);
    assert.ok(affected, new MyError('更新失败，请检查', 400));

    this.success(params, '更新成功');
  }

  @Del('/remove', {
    summary: '删除菜单',
    description: '关联关系表不会删除其中的内容，可以同时删除多个菜单',
  })
  @Validate()
  async remove(@Body() params: RemoveMenuDTO) {
    // 检查菜单是否存在
    await this.service.checkMenuExists(params.ids);

    const total = await this.service.removeAdminMenuByIds(params.ids);

    assert.ok(total, new MyError('删除失败，请检查', 400));

    this.success(total, '删除成功');
  }

  @Patch('/order', {
    summary: '对菜单进行排序',
    description:
      '需要全量的进行排序，数组下标索引即顺序，前端配合 antd-nestable 这个包使用',
  })
  @Validate()
  async order(@Body() params: OrderMenuMenuDTO) {
    const { orders } = params;

    // 检查菜单是否存在
    await this.service.checkMenuExists(orders.map(item => item.id));

    const newMenu = orders.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    const total = await this.service.orderAdminMenu(newMenu);
    assert.ok(total, new MyError('更新失败，请检查', 400));

    this.success(total, '保存成功');
  }
}
