'use strict';

/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: 'mysql55.rdsmblk9bzj65s3.rds.bj.baidubce.com',
      port: '',
      database: 'hejianbin',
      user: 'jianbinhe',
      password: 'jianbinhe',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};