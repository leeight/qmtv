'use strict';

/**
 * model
 * @see https://thinkjs.org/zh-cn/doc/2.2/model_intro.html#toc-6fa
 */
export default class extends think.model.base {
  init(...args){
    super.init(...args);
  }

  async getList() {
    let data = await this.field('title, content')
        .where({id: ['>', 100]})
        .order('id DESC')
        .select();
    return data;
  }
}