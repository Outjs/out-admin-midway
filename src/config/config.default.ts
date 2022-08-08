import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1648904763507_890',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'admin',
    synchronize: false,
    logging: false,
    dateStrings: true,
  },
  passport: {
    session: false,
  },
  jwt: {
    secret: '123456XXXM',
    expiresIn: 11111, //60 * 60 * 24 * 1,
  },
  redis: {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      //password: 'auth',
      db: 0,
    },
  },
  swagger: {
    auth: {
      authType: 'bearer',
    },
  },
} as MidwayConfig;
