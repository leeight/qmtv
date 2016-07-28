'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    try {
      let QmtvService = think.service('qmtv');
      let instance = new QmtvService();

      let model = this.model('video');
      let videos = model.getList();

      this.assign({
        hello: 'world',
        videos: videos
      });
      //auto render template file index_index.html
      return this.display();
    }
    catch (err) {
      return this.fail(err.message);
    }
  }
}