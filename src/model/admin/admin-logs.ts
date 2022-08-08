import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModel } from '../base';

@EntityModel({
  name: 'admin_operation_log',
})
export class AdminLogModel extends BaseModel {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @Column({
    type: 'integer',
    name: 'user_id',
    comment: '用户ID',
  })
  userId: string;

  @Column({
    type: 'varchar',
    name: 'name',
    comment: '名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'http路径',
  })
  path: string;

  @Column({
    type: 'varchar',
    length: 10,
    comment: 'http方法',
  })
  method: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'IP',
  })
  ip: string;

  @Column({
    type: 'text',
    comment: '输入',
  })
  input: string;
}
