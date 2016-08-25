/**
 * @file js/home/index.js
 * @author leeight
 */

define(function (require) {
    require('../base/coverflow');

    var $ = require('jquery');

    var exports = {};
    var coverflowIndex = 1;

    function getCurrentCoverflowIndex() {
        var index = 0;
        $('#coverflow').find('figure').each(function () {
            if (!$(this).hasClass('ui-state-active')) {
                index++;
            }
            else {
                return false;
            }
        });
        return index;
    }

    function refreshChangePageStatus() {
        var coverflowLength = $('#coverflow').find('figure').length;
        var currentIndex = getCurrentCoverflowIndex();
        $('.change-page').removeClass('inactive');
        if (currentIndex === 0) {
            $('.prev').addClass('inactive');
        }
        if (currentIndex === coverflowLength - 1) {
            $('.next').addClass('inactive');
        }
    }

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
            active: coverflowIndex,
            select: function (event, ui) {
                refreshChangePageStatus();
            }
        });
        
        $('#coverflow img').click(function() {
            if(!$(this).hasClass('ui-state-active')){
                return;
            }

            $('#coverflow').coverflow('next');
        });

        $('.next').click(function () {
            $('#coverflow').coverflow('next');
        });

        $('.prev').click(function () {
            $('#coverflow').coverflow('prev');
        });

    };

    return exports;
})