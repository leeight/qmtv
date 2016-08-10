/**
 * @file video/anchor.js
 * @author leeight
 */

define(function (require) {
    var $ = require('jquery');
    var pager = require('../base/pager');
    var AnchorModel = require('../base/anchor_model');

    var exports = {};

    /**
     * 调用接口，检查一下当前关注的状态
     */
    function checkFollowingStatus() {
        AnchorModel.isFollow(G_ANCHOR_ID)
            .done(function (data, textStatus, jqXHR) {
                if (data && data.code === 200) {
                    var isFollow = data.data.isFollow;
                    if (isFollow) {
                        $('.follow a').html('<i class="icon-plus"></i> 取消订阅');
                    }
                    $('.follow').removeClass('disabled').data('isFollow', isFollow);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                // 请求失败了
            });
    }

    exports.start = function (page, pageSize, totalCount) {
        var pagerHtml = pager.getPager(page, pageSize, totalCount);
        $('.pager').html('<ul>' + pagerHtml + '</ul>');

        checkFollowingStatus();

        $('.follow').click(function () {
            var btn = $(this);
            if (btn.hasClass('disabled')) {
                return false;
            }

            var isFollow = btn.data('isFollow');
            if (isFollow === true) {
                AnchorModel.unfollow(G_ANCHOR_ID).done(function (data) {
                    $('.follow a').html('<i class="icon-plus"></i> 订阅');
                    btn.data('isFollow', false);
                });
            }
            else if (isFollow === false) {
                AnchorModel.follow(G_ANCHOR_ID).done(function (data) {
                    $('.follow a').html('<i class="icon-plus"></i> 取消订阅');
                    btn.data('isFollow', true);
                });
            }
        });

        AnchorModel.get(G_ANCHOR_ID).done(function (data, textStatus, jqXHR) {
            if (data && data.play_status === true) {
                $('.info h3 strong').show();
            }
        });
    };

    return exports;
});