/**
 * @file video/controller/search.js
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
        let word = this.get('word') || '';
        let page = parseInt(this.get('page'), 10) || 1;
        let pageSize = 16;
        let totalCount = 0;
        let videos = [];
        
        if (word) {
            totalCount = await this.model('video')
                .where({name: ['LIKE', '%' + word + '%']})
                .count();
            videos = await this.model('video')
                .where({name: ['LIKE', '%' + word + '%']})
                .page(page)
                .select();
        }

        this.assign({
            videos, totalCount, page, pageSize, word
        })
        
        return this.display();
    }
}