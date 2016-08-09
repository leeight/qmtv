/**
 * @file base/anchor_model.js
 * @author leeight
 */

define(function (require) {
    var $ = require('jquery');

    var exports = {};

    exports.isFollow = function (anchorId) {
        return $.ajax({
            url: '/user/isFollow',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify({
                p: {
                    roomId: anchorId
                }
            })
        });
    };

    exports.follow = function (anchorId) {
        return $.ajax({
            url: '/user/follow',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify({
                p: {
                    roomId: anchorId
                }
            })
        });
    };

    exports.unfollow= function (anchorId) {
        return $.ajax({
            url: '/user/unFollow',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify({
                p: {
                    roomId: anchorId
                }
            })
        });
    };

    return exports;
});