/**
 * @file js/home/index.js
 * @author leeight
 */

define(function (require) {
    var $ = require('jquery');

    var exports = {};

    exports.start = function () {
        $('ul.tab li').click(function () {
            if ($(this).hasClass('active')) {
                return;
            }
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $(this).parent('ul').next().find('>div').hide();
            $(this).parent('ul').next().find('>div.' + $(this).data('body')).show();
        })
    };

    return exports;
})