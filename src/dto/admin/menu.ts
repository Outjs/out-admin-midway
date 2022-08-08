import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

/**
 * 菜单列表查询参数
 */
export class QueryMenuDTO {
  @ApiProperty({ description: '当前页' })
  @Rule(RuleType.number().min(1).max(100000).default(1).optional())
  current?: number;

  @ApiProperty({ description: '每页数量' })
  @Rule(RuleType.number().min(1).max(1000).default(10).optional())
  pageSize?: number;
}

/**
 * 获取单条菜单参数
 */
export class ShowMenuDTO {
  @ApiProperty({ description: '菜单id' })
  @Rule(RuleType.string().trim().max(10).required())
  id: string;
}

/**
 * 删除菜单参数
 */
export class RemoveMenuDTO {
  @ApiProperty({ description: '菜单id数组' })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).min(1))
  ids: string[];
}

/**
 * 创建菜单参数
 */
export class CreateMenuDTO {
  @ApiProperty({ description: '父级菜单的id' })
  @Rule(RuleType.string().trim().max(10).optional().default(0))
  parentId?: string;

  @ApiProperty({ description: '菜单名' })
  @Rule(RuleType.string().trim().max(50).required())
  name: string;

  @ApiProperty({ description: '路由地址(前端使用的)' })
  @Rule(
    RuleType.string().trim().max(255).uri({ allowRelative: true }).required()
  )
  path: string;

  @ApiProperty({ description: '关联的角色' })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).optional())
  roles?: string[];

  @ApiProperty({ description: '关联的权限' })
  @Rule(RuleType.string().trim().max(10).optional())
  permission?: string;
}

/**
 * 更新菜单参数
 */
export class UpdateMenuDTO {
  @ApiProperty({ description: '菜单的id' })
  @Rule(RuleType.string().trim().max(10).required())
  id: string;

  @ApiProperty({ description: '父级菜单的id' })
  @Rule(RuleType.string().trim().max(10).allow(''))
  parentId?: string;

  @ApiProperty({ description: '菜单名' })
  @Rule(RuleType.string().trim().max(50).optional())
  name?: string;

  @ApiProperty({ description: '路由地址(前端使用的)' })
  @Rule(
    RuleType.string().trim().max(255).uri({ allowRelative: true }).optional()
  )
  path?: string;

  @ApiProperty({ description: '关联的角色' })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10).optional()))
  roles?: string[];

  @ApiProperty({ description: '关联的权限' })
  @Rule(RuleType.string().trim().max(10).allow(''))
  permission?: string;
}

/**
 * 菜单排序参数
 */
export class OrderMenuMenuDTO {
  @ApiProperty({
    description: '对菜单进行排序对数组，每个object 都需要 id parentId',
  })
  @Rule(
    RuleType.array()
      .items(
        RuleType.object({
          id: RuleType.string().trim().max(10).required(),
          parentId: RuleType.string().trim().max(10).optional().default('0'),
        })
      )
      .min(1)
      .required()
  )
  orders: {
    id: string;
    parentId: string;
  }[];
}
