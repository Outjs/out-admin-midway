import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

/**
 * 查询管理员列表参数
 */
export class QueryUserDTO {
  @ApiProperty({ description: '当前页' })
  @Rule(RuleType.number().min(1).max(100000).default(1).optional())
  current?: number;

  @ApiProperty({ description: '每页数量' })
  @Rule(RuleType.number().min(1).max(1000).default(10).optional())
  pageSize?: number;

  @ApiProperty({ description: '筛选字段-id' })
  @Rule(RuleType.string().trim().max(10).optional())
  id?: string;

  @ApiProperty({ description: '筛选字段-名称' })
  @Rule(RuleType.string().trim().max(50).optional())
  name?: string;

  @ApiProperty({ description: '筛选字段-帐号' })
  @Rule(RuleType.string().trim().max(50).optional())
  username?: string;

  @ApiProperty({
    description:
      '排序字段，以字段名加下划线组合，不能有特殊字符和不存在的字段。例如: name_ASC 或者 name_DESC',
  })
  @Rule(
    RuleType.string()
      .trim()
      .max(50)
      .regex(/^[a-zA-Z]*(_ascend|_descend)$/)
      .optional()
      .allow('')
  )
  sorter?: string;
}

/**
 * 获取单个管理员参数
 */
export class ShowUserDTO {
  @ApiProperty({ description: '管理员的id' })
  @Rule(RuleType.string().trim().max(10).required())
  id: string;
}

/**
 * 删除管理员参数
 */
export class RemoveUserDTO {
  @ApiProperty({ description: '管理员id的数组' })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).min(1))
  ids: string[];
}

/**
 * 创建管理员参数
 */
export class CreateUserDTO {
  @ApiProperty({ description: '帐号，登录用的' })
  @Rule(RuleType.string().trim().min(5).max(32).required())
  username: string;

  @ApiProperty({ description: '名称' })
  @Rule(RuleType.string().trim().min(1).max(32).required())
  name: string;

  @ApiProperty({ description: '头像' })
  @Rule(RuleType.string().trim().max(255).optional())
  avatar?: string;

  @ApiProperty({
    description: '密码(数据库入库前会进行加密)，前端做二次确认校验',
  })
  @Rule(RuleType.string().trim().min(6).max(60).required())
  password: string;

  @ApiProperty({ description: '关联的角色' })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).optional())
  roles?: string[];

  @ApiProperty({ description: '关联的权限' })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).optional())
  permissions?: string[];
}

/**
 * 更新管理员参数
 */
export class UpdateUserDTO {
  @ApiProperty({ description: '管理员id' })
  @Rule(RuleType.string().trim().max(10).required())
  id: string;

  @ApiProperty({ description: '帐号，登录用的' })
  @Rule(RuleType.string().trim().min(5).max(32).required())
  username: string;

  @ApiProperty({ description: '名称' })
  @Rule(RuleType.string().trim().min(1).max(32).required())
  name: string;

  @ApiProperty({ description: '头像' })
  @Rule(RuleType.string().trim().max(255).optional())
  avatar?: string;

  @ApiProperty({
    description: '密码(数据库入库前会进行加密)，前端做二次确认校验',
  })
  @Rule(RuleType.string().trim().min(6).max(60).required())
  password: string;

  @ApiProperty({ description: '关联的角色' })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).optional())
  roles?: string[];

  @ApiProperty({ description: '关联的权限' })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).optional())
  permissions?: string[];
}
