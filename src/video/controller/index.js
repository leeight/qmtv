'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let video = await this.model('video')
      .setRelation('anchor')
      .where({id: [1,2]})
      .select();
    return this.json(video);
    //auto render template file index_index.html
    // return this.display();
  }
}