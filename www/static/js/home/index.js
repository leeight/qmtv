/**
 * @file js/home/index.js
 * @author leeight
 */

define(function (require) {
    require('../base/coverflow');

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
        });

        $('.coverflow-wrapper .loading').remove();

        $('#coverflow').show();

        $('#coverflow').coverflow({
            active: 1,
            select: function(event, ui){
                // console.log('here');
            }
        });
        
        $('#coverflow img').click(function() {
            if(!$(this).hasClass('ui-state-active')){
                return;
            }
            $('#coverflow').coverflow('next');
        });
    };

    return exports;
})