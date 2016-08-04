'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async top(n = 10, uids) {
        let query = this.cache(60).limit(n);
        
        if (uids) {
            if (uids.length <= 0) {
                return [];
            }
            query.where({uid: uids});
        }
        
        return await query.select();
    }
}