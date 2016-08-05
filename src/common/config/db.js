'use strict';

/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  connectionLimit: 10,
  adapter: {
    mysql: {
      host: 'mysql55.rdsmblk9bzj65s3.rds.bj.baidubce.com',
      port: '',
      database: 'hejianbin',
      user: 'jianbinhe',
      password: 'jianbinhe',
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
};