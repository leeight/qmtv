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

      this.assign({
        hello: 'world'
      });
      //auto render template file index_index.html
      return this.display();
    }
    catch (err) {
      return this.fail(err.message);
    }
  }
}