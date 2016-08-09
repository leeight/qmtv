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

        return await this.model('video').where({id: videoIds}).select();
    }
}