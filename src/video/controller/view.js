'use strict';

import Base from './base.js';

export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */

    async indexAction() {
        try {
            let videoId = this.get('id');
            let video = await this.model('video').getVideoById(videoId);
            // 获取主播信息，其中包括四个最新视频
            let anchor = await this.model('anchor').where({uid: video.anchor.uid}).list([1, 4], 'start_time DESC');
            // topic下获取4个推荐视频
            let topicVideoIds = video.topic.videos ? video.topic.videos.split(';') : [];
            let topicVideos = [];
            if (topicVideoIds.length > 0) {
                topicVideos = await this.model('video').where({id: topicVideoIds}).limit(4).select();
            }
            this.assign({
                video,
                anchor,
                topicVideos
            });

            // auto render template file index_index.html
            return this.display();
        }
        catch (err) {
            return this.fail(err.message);
        }
    }

}
