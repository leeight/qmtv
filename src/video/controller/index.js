'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        try {
            let videos = await this.model('recommend_video').top(6);
            // recommend_topics不做数量限制 zhangzhe 2016-08-25
            let topics = await this.model('recommend_topic').top();
            this.assign({
              topics, videos
            });

            return this.display();
        }
        catch (err) {
            return this.fail(err.message);
        }
    }
}