'use strict';

/**
 * model
 * @see https://thinkjs.org/zh-cn/doc/2.2/model_intro.html#toc-6fa
 */
export default class extends think.model.relation {
    init(...args) {
        super.init(...args);
        // this.relation = {
        //     anchor: {
        //         type: think.model.BELONG_TO,
        //         key: 'anchor',
        //         fKey: 'uid'
        //     }
        // }
    }

    async top(n = 10, vids) {
        let query = this.limit(n);

        if (vids) {
            if (vids.length <= 0) {
                return [];
            }
            
            query.where({id: vids});
        }

        let videos = await query.select();

        // TODO(leeight) 这样子的查询可能存在性能问题
        // this.relation 的配置貌似没有效果，为啥呢？
        for (let i = 0; i < videos.length; i++) {
            let video = videos[i];
            let uid = video.anchor;
            video.anchor = await this.model('anchor')
              .cache(60)
              .where({uid})
              .find();
        }

        return videos;
    }
}