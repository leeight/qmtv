'use strict';

var _ = require('lodash');

/**
 * model
 */
export default class extends think.model.base {
    async top(n = 5) {
        let topics = await this.limit(n).select();

        let anchorIds = [];
        for (let i = 0; i < topics.length; i++) {
            let topic = topics[i];

            // 先查询 Video
            let vids = topic.videos ? topic.videos.split(';') : [];
            topic.videos = await this.model('video').top(6, vids, false);

            // 对于 Anchor 只收集Id，然后统一查询
            let uids = topic.anchors ? topic.anchors.split(';') : [];
            anchorIds.push.apply(anchorIds, uids);
            anchorIds.push.apply(anchorIds, topic.videos.map(item => item.anchor_id));
        }

        // 收集所有的 anchor id，然后再恢复上去
        let anchors = await this.model('anchor')
            .where({uid: _.uniq(anchorIds)})
            .select();
        let anchorMap = _.keyBy(anchors, 'uid');

        // 恢复 topics.anchors 的内容
        for (let i = 0; i < topics.length; i++) {
            let topic = topics[i];
            let uids = topic.anchors ? topic.anchors.split(';') : [];
            topic.anchors = _.compact(uids.map(uid => anchorMap[uid]));
            topic.videos.forEach(video => video.anchor = anchorMap[video.anchor_id]);
        }
        
        return topics;
    }
}