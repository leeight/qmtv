'use strict';

/**
 * model
 * @see https://thinkjs.org/zh-cn/doc/2.2/model_intro.html#toc-6fa
 */
export default class extends think.model.relation {
    init(...args) {
        super.init(...args);

        this.relation = {
            anchor: {
                type: think.model.BELONG_TO,
                key: 'anchor_id',
                fKey: 'uid',
                relation: false
            },
            topic: {
                type: think.model.BELONG_TO,
                key: 'topic_id',
                fKey: 'id',
                relation: false
            }
        };
    }

    async top(n = 10, vids, f = true) {
        let query = this.limit(n).order('base_play_count + real_play_count DESC')

        if (vids) {
            if (vids.length <= 0) {
                return [];
            }

            query.where({id: vids});
        }

        if (!f) {
            query.setRelation(false);
        }
        
        let videos = await query.select();
        return videos;
    }

    // 根据视频id查询单个视频(包括主播和分类信息)
    async getVideoById(vid) {
        return await this.where({id: vid}).find();
    }
}
