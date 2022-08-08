import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

/**
 * 查询日志列表参数
 */
export class QueryLogDTO {
  @ApiProperty({ description: '当前页' })
  @Rule(RuleType.number().min(1).max(100000).default(1))
  current?: number;

  @ApiProperty({ description: '每页数量' })
  @Rule(RuleType.number().min(1).max(1000).default(10))
  pageSize?: number;

  @ApiProperty({ description: '筛选字段-id' })
  @Rule(RuleType.string().trim().max(10).optional().allow(''))
  id?: string;

  @ApiProperty({ description: '筛选字段-用户ID' })
  @Rule(RuleType.string().trim().max(50).optional().allow(''))
  userId?: string;

  @ApiProperty({ description: '筛选字段-用户名称' })
  @Rule(RuleType.string().trim().max(255).optional().allow(''))
  name?: string;

  @ApiProperty({ description: '筛选字段-ip' })
  @Rule(RuleType.string().trim().max(255).optional().allow(''))
  ip?: string;

  @ApiProperty({ description: '筛选字段-路径' })
  @Rule(RuleType.string().trim().max(255).optional().allow(''))
  path?: string;

  @ApiProperty({ description: '筛选字段-请求方式' })
  @Rule(RuleType.string().trim().max(10).optional().allow(''))
  method?: string;

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
 * 删除日志参数
 */
export class RemoveLogDTO {
  @ApiProperty({ description: '日志id的数组', example: ['1'] })
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).min(1))
  ids: string[];
}

/**
 * 创建日志参数
 */
export class CreateLogDTO {
  @ApiProperty({ description: '用户ID' })
  @Rule(RuleType.string().trim().max(50).optional().allow(''))
  userId: string;

  @ApiProperty({ description: '名称' })
  @Rule(RuleType.string().trim().max(50).optional().allow(''))
  name: string;

  @ApiProperty({ description: 'ip' })
  @Rule(RuleType.string().trim().max(255).required())
  ip: string;

  @ApiProperty({ description: '请求方式' })
  @Rule(RuleType.string().trim().max(10).required())
  method: string;

  @ApiProperty({ description: '接口路径' })
  @Rule(RuleType.string().uri({ allowRelative: true }).required())
  path: string;

  @ApiProperty({ description: '接口参数' })
  @Rule(RuleType.string().trim().required())
  input: string;
}
