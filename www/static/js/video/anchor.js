/**
 * @file video/anchro.js
 * @author leeight
 */

define(function (require) {
    var $ = require('jquery');

    var exports = {};

    var plainTpl = '<li class="${className}" data-page="${page}">${text}</li>';
    var anchorTpl = '<li class="${className}"><a href="${link}">${text}</a></li>';
    var omitTpl = '<li class="${className}">…</li>';
    
    function format(template, data) {
        if (!template) {
            return '';
        }

        if (data == null) {
            return template;
        }

        return template.replace(
            /\$\{(.+?)\}/g,
            function (match, key) {
                var replacer = data[key];
                if (typeof replacer === 'function') {
                    replacer = replacer(key);
                }

                return replacer == null ? '' : replacer;
            }
        );
    };

    function getSegmentHTML(obj, tpl) {
        if (!tpl) {
            var templates = {
                anchor: anchorTpl,
                plain: plainTpl
            };

            // 由于pageType需要由外部指定，当指定的模板不存在时默认匹配anchor
            tpl = templates.anchor;
        }

        return format(tpl, obj);
    }

    function getUrlByTemplate(num) {
        return '?page=' + num;
    }

    function getTplObj(className, num, id, text) {
        var obj = {
            className: className
        };

        if (arguments.length > 1) {
            obj.link = getUrlByTemplate(num);
            obj.page = num;
            obj.text = text;
        }

        return obj;
    }

    function getPager(page, pageSize, totalCount) {
        var backText = '←';
        var backCount = 3;
        var forwardText = '→';
        var forwardCount = 3;
        var totalPage = Math.ceil(totalCount / pageSize);
        var html = [];

        function addSegmentToHTML(obj, tpl) {
            if (typeof obj === 'number') {
                obj = getTplObj('item', obj, 'page-' + obj, obj);
            }
            var segment = getSegmentHTML(obj, tpl);

            html.push(segment);
        }
        
        // 上一页
        if (page > 1) {
            var obj = getTplObj(
                'item-extend', page - 1, 'page-back', backText);
            addSegmentToHTML(obj);
        }
        else {
            var obj = getTplObj(
                'item-extend-disabled', page - 1, 'page-back-disabled', backText);
            addSegmentToHTML(obj);
        }

        // 前缀页码
        if (page > backCount + 1) {
            addSegmentToHTML(1);

            // 前缀 ... 符号
            if (page > backCount + 2) {
                var obj = getTplObj('item-omit');
                addSegmentToHTML(obj, omitTpl);
            }    
        }

        // 中间页码区
        var len = page > backCount ? backCount : page - 1;
        for (var i = page - len; i < page; i++) {
            addSegmentToHTML(i);
        }

        // 当前页码
        var obj = getTplObj(
            'item-current',
            page,
            'page-' + page,
            page
        );
        addSegmentToHTML(obj, plainTpl);

        // 后置页码
        var len = totalPage - page > forwardCount
            ? forwardCount
            : totalPage - page;
        for (var i = page + 1; i < page + len + 1; i++) {
            addSegmentToHTML(i);
        }

        // 后缀页码
        if (page < totalPage - forwardCount) {
            // 后缀 ... 符号
            if (page < totalPage - forwardCount - 1) {
                var obj = getTplObj('item-omit');
                addSegmentToHTML(obj, omitTpl);
            }

            addSegmentToHTML(totalPage);
        }

        // 下一页
        if (page < totalPage) {
            var obj = getTplObj(
                'item-extend', page + 1, 'page-forward', forwardText);
            addSegmentToHTML(obj);
        }
        else {
            var obj = getTplObj(
                'item-extend-disabled', page + 1, 'page-forward-disabled', forwardText);
            addSegmentToHTML(obj);
        }

        return html.join('');
    }

    exports.start = function (page, pageSize, totalCount) {
        var pagerHtml = getPager(page, pageSize, totalCount);
        $('.pager').html('<ul>' + pagerHtml + '</ul>');
    };

    return exports;
});