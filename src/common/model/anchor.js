'use strict';
/**
 * model
 */
export default class extends think.model.relation {
    init(...args) {
        super.init(...args);
        this.pk = 'uid';
        this.relation = {
            videos: {
                type: think.model.HAS_MANY,
                model: 'video',
                key: 'uid',
                fKey: 'anchor',
                limit: 16
            }
        }
    }

    async list(page, orderByValue) {
        return this.setRelation('videos', {page, order: orderByValue}).find();
    }

    async top(n = 10, uids) {
        let query = this.limit(n);
        
        if (uids) {
            if (uids.length <= 0) {
                return [];
            }
            query.where({uid: uids});
        }
        
        return await query.select();
    }
}