'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async top(n = 5) {
        let topics = await this.limit(n).select();

        for (let i = 0; i < topics.length; i++) {
            let topic = topics[i];
            let uids = topic.anchors ? topic.anchors.split(';') : [];
            let vids = topic.videos ? topic.videos.split(';') : [];
            topic.anchors = await this.model('anchor').top(10, uids);
            topic.videos = await this.model('video').top(6, vids);
        }

        return topics;
    }
}