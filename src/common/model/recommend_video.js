'use strict';

import _ from 'lodash';

/**
 * model
 */
export default class extends think.model.base {
    async top(n = 3) {
        let topN = await this.limit(n).order('id DESC').select();
        let videoIds = [];

        for (let i = 0; i < topN.length; i++) {
            videoIds.push(topN[i].video_id);
        }

        let videos = await this.model('video').where({id: videoIds}).select();
        _.each(videos, video => {
            let recommend_video = _.find(topN, {video_id: video.id});
            if (recommend_video && recommend_video.cover_url) {
                video.cover_url = recommend_video.cover_url;
            }
        });
        return videos;
    }
}