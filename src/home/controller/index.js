'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        try {
            let QmtvService = think.service('qmtv');
            let instance = new QmtvService();

            let model = this.model('recommend_topic');
            let topics = await model.top(5);

            this.assign({
              hello: 'world',
              topics,
            });
            //auto render template file index_index.html
            return this.display();
        }
        catch (err) {
            return this.fail(err.message);
        }
    }
}