/**
 * @file video/controller/category.js
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
        let name = this.get('category') || '';
        let orderBy = this.get('orderBy') || 'create_time';
        let orderByValue = orderBy == 'create_time'
            ? 'create_time DESC'
            : 'base_play_count + real_play_count DESC';
        let page = parseInt(this.get('page'), 10) || 1;
        let pageSize = 20;
        let totalCount = 0;
        let videos = [];
        let categories = await this.model('topic').select();
        let category = null;

        // 定位当前的分类
        if (name === 'all') {
            totalCount = await this.model('video').count();
            videos = await this.model('video').order(orderByValue).page(page).select();
        }
        else {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].name === name) {
                    category = categories[i];
                    break;
                }
            }

            if (category) {
                totalCount = await this.model('video')
                    .where({topic_id: category.id})
                    .count();
                videos = await this.model('video')
                    .setRelation('anchor')
                    .where({topic_id: category.id})
                    .order(orderByValue)
                    .page(page)
                    .select();
            }
        }

        this.assign({
            videos, totalCount, page, pageSize, category,
            categories, orderBy
        })
        
        return this.display();
    }
}
