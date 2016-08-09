'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  isfollowAction(){
    return this.json({
      code: 200,
      data: {
        isFollow: Math.random() > .5
      }
    });
  }

  unfollowAction() {
    if (Math.random() > .5) {
      return this.json({
        code: 200,
        data: []
      });
    }

    this.status(400);
    return this.json({
      code: 400,
      error: 'ERROR',
      data: []
    });
  }

  followAction() {
    if (Math.random() > .5) {
      return this.json({
        code: 200,
        data: []
      });
    }

    this.status(400);
    return this.json({
      code: 400,
      error: 'ERROR',
      data: []
    });
  }
}