let _d = document;

export default {
    // 获取滚动条高度
    getScrollTop () {
        var bodyScrollTop = 0;
        var documentScrollTop = 0;
        if (_d.body) {
            bodyScrollTop = _d.body.scrollTop;
        }
        if (_d.documentElement) {
            documentScrollTop = _d.documentElement.scrollTop;
        }
        return bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    },
    // 文档的总高度
    getScrollHeight () {
        var bodyScrollHeight = 0;
        var documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        return bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
    },
    // 浏览器视口的高度
    getWindowHeight () {
        var windowHeight = 0;
        if (document.compatMode === 'CSS1Compat') {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
}