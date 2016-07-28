'use strict';
/**
 * template config
 */
export default {
  type: 'etpl',
  content_type: 'text/html',
  file_ext: '.html',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  adapter: {
    ejs: {},
    etpl: {
      strip: true
    }
  }
};