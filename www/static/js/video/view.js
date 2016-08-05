/**
 * @file js/video/view.js
 * @author zhangzhe
 */

define(function (require) {
    var $ = require('jquery');
    var cyberplayer = require('cyberplayer');

    var exports = {};

    function cyberplayerInit(videoUrl, thumbnailUrl, videoContainer) {
        var cyberplayerOptions = {
            width: 896,
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

    exports.start = function (videoUrl, thumbnailUrl) {
        // 播放器初始化
        cyberplayerInit(videoUrl, thumbnailUrl, 'playerContainer');
    };

    return exports;
});
