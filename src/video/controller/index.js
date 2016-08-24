'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        try {
            let videos = await this.model('recommend_video').top(3);            
            let topics = await this.model('recommend_topic').top(5);
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