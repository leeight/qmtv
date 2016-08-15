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
        let orderBy = this.get('orderBy') || 'start_time';
        let orderByValue = orderBy == 'start_time'
            ? 'start_time DESC'
            : 'base_play_count + real_play_count DESC';
        let page = parseInt(this.get('page'), 10) || 1;
        let pageSize = 20;
        let anchor = await this.model('anchor')
            .where({uid})
            .list(page, orderByValue);
        let totalCount = await this.model('video')
            .where({anchor_id: uid})
            .count();
        this.assign({
            anchor, totalCount, page, pageSize,
            orderBy
        })
        return this.display();
    }
}