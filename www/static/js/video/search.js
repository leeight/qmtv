/**
 * @file video/search.js
 * @author leeight
 */

define(function (require) {
    var $ = require('jquery');
    var pager = require('../base/pager');

    var exports = {};
    exports.start = function (page, pageSize, totalCount) {
        var pagerHtml = pager.getPager(page, pageSize, totalCount);
        $('.pager').html('<ul>' + pagerHtml + '</ul>');
    };

    return exports;
});