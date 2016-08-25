'use strict';

var _ = require('lodash');

/**
 * model
 */
export default class extends think.model.base {
    async top(n) {
        let topics = n ? await this.limit(n).select() : await this.select();

        let anchorIds = [];
        let topicIds = [];
        for (let i = 0; i < topics.length; i++) {
            let topic = topics[i];

            topicIds.push(topic.id);

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

        // 查一下 Ranks 的信息
        // TODO(x) 这里可能存在数据量过大的问题
        let videoRanking = await this.model('recommend_topic_video_ranking')
            .where({recommend_topic_id: topicIds})
            .order('video_ranking ASC')
            .select();
        let anchorRanking = await this.model('recommend_topic_anchor_ranking')
            .where({recommend_topic_id: topicIds})
            .order('anchor_ranking ASC')
            .select();
        
        // 恢复 topics.anchors 和 topics.ranking 的内容
        for (let i = 0; i < topics.length; i++) {
            let topic = topics[i];
            let uids = topic.anchors ? topic.anchors.split(';') : [];
            topic.anchors = _.compact(uids.map(uid => anchorMap[uid]));
            topic.videos.forEach(video => video.anchor = anchorMap[video.anchor_id]);

            let video_rankings = [];
            let anchor_rankings = [];
            let kMax = 10;  // 排行榜最大的条数
            for (let i = 0; i < videoRanking.length; i++) {
                let item = videoRanking[i];
                if (item.recommend_topic_id === topic.id) {
                    video_rankings.push(item);
                    if (video_rankings.length >= kMax) {
                        break;
                    }
                }
            }
            for (let i = 0; i < anchorRanking.length; i++) {
                let item = anchorRanking[i];
                if (item.recommend_topic_id === topic.id) {
                    anchor_rankings.push(item);
                    if (anchor_rankings.length >= kMax) {
                        break;
                    }
                }
            }
            topic.video_rankings = video_rankings;
            topic.anchor_rankings = anchor_rankings;
        }

        return topics;
    }
}