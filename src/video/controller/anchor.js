/**
 * @file video/controller/anchor.js
 * @author leeight
 */

'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        let uid = this.get('id');
        let page = parseInt(this.get('page'), 10) || 1;
        let pageSize = 16;
        let anchor = await this.model('anchor').where({uid}).list(page);
        let totalCount = await this.model('video').where({anchor: uid}).count();
        this.assign({
            anchor, totalCount, page, pageSize
        })
        return this.display();
    }
}