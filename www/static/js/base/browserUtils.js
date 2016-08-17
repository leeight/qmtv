/**
 * @file js/base/view.js
 * @author zhangzhe(zhangzhe@baidu.com)
 */

 define(function(require) {
    var browser = {};

    var _userAgentMatch = function (regex) {
        var agent = navigator.userAgent.toLowerCase();
        return (agent.match(regex) !== null);
    };

    function _browserCheck(regex) {
        return function () {
            return _userAgentMatch(regex);
        };
    }

    browser.isFF = _browserCheck(/firefox/i);
    browser.isIPod = _browserCheck(/iP(hone|od)/i);
    browser.isIPad = _browserCheck(/iPad/i);
    browser.isSafari602 = _browserCheck(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i);
    browser.isOSX = _browserCheck(/Mac OS X/i);
    browser.isEdge = _browserCheck(/\sedge\/\d+/i);

    var _isIETrident = browser.isIETrident = function(browserVersion) {
        if(browser.isEdge()){
            return true;
        }
        if (browserVersion) {
            browserVersion = parseFloat(browserVersion).toFixed(1);
            return _userAgentMatch(new RegExp('trident/.+rv:\\s*' + browserVersion, 'i'));
        }
        return _userAgentMatch(/trident/i);
    };

    var _isMSIE = browser.isMSIE = function(browserVersion) {
        if (browserVersion) {
            browserVersion = parseFloat(browserVersion).toFixed(1);
            return _userAgentMatch(new RegExp('msie\\s*' + browserVersion, 'i'));
        }
        return _userAgentMatch(/msie/i);
    };

    browser.isIE = function(browserVersion) {
        if (browserVersion) {
            browserVersion = parseFloat(browserVersion).toFixed(1);
            if (browserVersion >= 11) {
                return _isIETrident(browserVersion);
            } else {
                return _isMSIE(browserVersion);
            }
        }
        return _isMSIE() || _isIETrident();
    };

    // 是否是低版本IE
    browser.isPoorIE = function () {
        return this.isIE() && (_isMSIE(8) || _isMSIE(7) || _isMSIE(6) ||
            (document.documentMode && document.documentMode <= 8));
    };

    return browser;
});
