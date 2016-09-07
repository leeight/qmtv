'use strict';

export default {
  port: 8080,
  resource_on: true,
  db: {
    type: 'mysql',
    connectionLimit: 10,
    adapter: {
      mysql: {
        host: 'mysql.rdsmv0kkphj2n8j.rds.gz.baidubce.com',
        port: '',
        database: 'qm_vod',
        user: 'qazwsx',
        password: 'PL5IiK9p3z5IL1',
        prefix: 'think_',
        encoding: 'utf8',
        nums_per_page: 20
      },
      mongo: {

      },
      cache: {
        on: true, // 数据库缓存配置的总开关，关闭后即使程序中调用 cache 方法也无效
        type: '', // 默认为内存缓存
        timeout: 3600 // 默认缓存时间
      }
    }
  }
};
