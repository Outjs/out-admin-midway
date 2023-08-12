import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'admin', description: '管理员帐号' })
  @Rule(RuleType.string().required().min(5).max(190))
  username: string;

  @ApiProperty({ example: '123456', description: '密码' })
  @Rule(RuleType.string().required().min(5).max(60))
  password: string;
}
