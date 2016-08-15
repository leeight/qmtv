/**
 * @file js/video/view.js
 * @author zhangzhe
 */

define(function (require) {
    var $ = require('jquery');
    var cyberplayer = require('cyberplayer');
    var AnchorModel = require('../base/anchor_model');
    var ZeroClipboard = require('zeroclipboard/ZeroClipboard');

    var exports = {};

    function cyberplayerInit(videoUrl, thumbnailUrl, videoContainer) {
        var cyberplayerOptions = {
            width: 1200,
            height: 504,
            stretching: 'uniform',
            file: videoUrl,
            autostart: false,
            repeat: false,
            controls: true,
            ak: '468b8de7f7e84fb8ba5aa60c38b9edb0'
        };
        if (thumbnailUrl) {
            cyberplayerOptions.image = thumbnailUrl;
        }
        var player = cyberplayer(videoContainer).setup(cyberplayerOptions);
        return player;
    }

    function shareInit(thumbnailUrl) {
        var timer = null;
        $('.share').hover(function () {
            $('.share-box').show();
        }, function () {
            timer = setTimeout(function () {
                $('.share-box').hide();
            }, 800);
        });

        $('.share-box').hover(function () {
            clearTimeout(timer);
            $(this).show();
        }, function () {
            $(this).hide();
        });

        var currentUrl = window.location.href;
        $('.url-input').val(currentUrl);
        $('.copy-button').attr('data-clipboard-text', currentUrl);

        window._bd_share_config = {
            common : {
                bdText: '全民看视频，精彩内容尽在' + currentUrl, 
                bdUrl: currentUrl,   
                bdPic: thumbnailUrl
            },
            share: [{
                bdSize: 32
            }]
        };

        with(document)0[(getElementsByTagName('head')[0]||body)
            .appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js'
            + '?cdnversion='+~(-new Date()/36e5)];

        // 地址复制相关
        var client = new ZeroClipboard(document.getElementById('copyButton'));
        client.on('ready', function(readyEvent) {
            client.on('aftercopy', function (event) {
                alert('地址复制成功');
            });
        });
    }

    exports.start = function (videoUrl, thumbnailUrl) {
        // 播放器初始化
        cyberplayerInit(videoUrl, thumbnailUrl, 'playerContainer');

        AnchorModel.get(G_ANCHOR_ID).done(function (data, textStatus, jqXHR) {
            if (data) {
                if (data.play_status === true) {
                    $('.living').show();
                }
                // 头像也用这个接口
                $('.anchor-avatar').attr('src', data.avatar);
            }         
        });

        // 分享相关
        shareInit(thumbnailUrl);
    };

    return exports;
});
