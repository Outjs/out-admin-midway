import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class LoginDTO {
  @ApiProperty({ description: '管理员帐号' })
  @Rule(RuleType.string().required().min(5).max(190))
  username: string;

  @ApiProperty({ description: '密码' })
  @Rule(RuleType.string().required().min(5).max(60))
  password: string;
}
