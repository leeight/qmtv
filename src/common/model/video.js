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
                key: 'anchor',
                fKey: 'uid',
                relation: false
            },
            topic: {
                type: think.model.BELONG_TO,
                key: 'topic',
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

        let videos = await query.setRelation(false).select();

        // TODO(leeight) 这样子的查询可能存在性能问题
        // this.relation 的配置貌似没有效果，为啥呢？
        // recommend_topic.js 里面就不这么查询了，批量去初始化 anchor 的内容
        if (f) {
            for (let i = 0; i < videos.length; i++) {
                let video = videos[i];
                let uid = video.anchor;
                video.anchor = await this.model('anchor')
                    .cache(60)
                    .where({uid})
                    .find();
            }
        }

        return videos;
    }

    // 根据视频id查询单个视频(包括主播和分类信息)
    async getVideoById(vid) {
        // 为了性能先sql
        return await this.where({id: vid}).find();
    }
}