## out-admin-midway
<p align="center">out-admin-midway是使用 Midway.js 3.x（上层使用 Koa）开发的一个后台权限管理系统系统
<p align="center">
  <a href="http://midwayjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/midway-3.x-green#:~:text=midway-,midway,-3.x" alt="codecov" />
  </a>
  <a href="hhttps://github.com/Outjs/out-admin-midway" target="_blank">
    <img src="https://img.shields.io/badge/version-1.0.0-green#:~:text=version-,version,-1.0.0" alt="codecov" />
  </a>
  <a href="hhttps://github.com/Outjs/out-admin-midway/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/crates/l/MIT?label=license&logo=MIT" alt="codecov" />
  </a>
</p>


## 依赖环境


运行该项目需要以下环境支持
- Mysql
- Redis



### 数据库

先将 database 目录下到 sql 文件迁移到数据库，修改默认的config配置文件，位于src/config/config.default.ts

```
orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'order',
    synchronize: false, // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    logging: false,
    dateStrings: true,
}
```

### Redis
修改默认的config配置文件，位于src/config/config.default.ts
```
redis: {
  client: {
    port: 6379, // Redis port
    host: '127.0.0.1', // Redis host
    db: 0,
  }
}

```

## 运行

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

## 登录账号
```
账号: admin

密码: 123456
```


## Swagger


 - 访问地址http://127.0.0.1:7001/swagger-ui/index.html
- 先通过/api/auth/login登录获取到jwt的token
- 在swagger输入token进行授权，即可正常访问接口




