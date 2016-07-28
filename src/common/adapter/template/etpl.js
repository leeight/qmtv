'use strict';

import path from 'path';

import Base from 'thinkjs/lib/adapter/template/base';

/**
 * base adapter
 */
export default class extends Base {
  /**
   * init
   * @return {[]}         []
   */
  init(...args){
    super.init(...args);
  }

  /**
   * run
   * 
   * @param {String} templateFile []
   * @param {Object} tVar []
   * @return {Promise}
   */
  async run(templateFile, tVar, config) {
    // return think.config('view');
    let options = this.parseConfig(config);

    // 默认情况下
    // templateFile 是模板的路径
    // tVar 可以访问的值有 controller, http, config, _ 这四个
    // config 是 common/config/view.js 的配置内容
    let etpl = await think.npm('etpl');

    // FIXME(leeight) 在 production 环境下面，不应该被重复调用，应该只初始化一次
    let engine = new etpl.Engine(options);
    let baseTemplateContent = await this.getContent(path.join(options.root_path, 'common', 'base.html')); 
    let pageTemplateContent = await this.getContent(templateFile);
    engine.compile(baseTemplateContent);
    engine.compile(pageTemplateContent);
    return engine.render('page', tVar);
  }
}