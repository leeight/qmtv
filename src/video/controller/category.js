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
        let page = parseInt(this.get('page'), 10) || 1;
        let pageSize = 16;
        let totalCount = 0;
        let videos = [];
        let categories = await this.model('topic').select();
        let category = null;
        
        // 定位当前的分类
        if (name === 'all') {
            totalCount = await this.model('video').count();
            videos = await this.model('video').page(page).select();
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
                    .where({topic: category.id})
                    .count();
                videos = await this.model('video')
                    .where({topic: category.id})
                    .page(page)
                    .select();
            }
        }

        this.assign({
            videos, totalCount, page, pageSize, category,
            categories
        })
        
        return this.display();
    }
}