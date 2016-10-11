(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Mdropload = factory());
}(this, (function () { 'use strict';

var utils = {
    prefix: function () {
        var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1],
            dom = 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    }(),
    /**
     *
     * @param obj
     * @param key
     * @param value
     * @param closePrefix 是否关闭前缀
     */
    css: function css(obj, key, value, closePrefix) {
        // fixbug vivo and xiaomi
        obj.style[key] = value;
        if (!closePrefix) {
            obj.style[this.prefix.css + key] = value;
        }
    },
    elementCSS: function elementCSS(key, value) {
        if (arguments.length === 2) {
            utils.css(this, key, value);
        } else {
            return this.style[key];
        }
    },
    mouseXY: function mouseXY(_e) {
        // 用于扩展JQ的触摸事件
        var $x, $y;
        if (_e.originalEvent && _e.originalEvent.changedTouches) {
            $x = _e.originalEvent.changedTouches[0].pageX;
            $y = _e.originalEvent.changedTouches[0].pageY;
        } else if (_e.changedTouches) {
            $x = _e.changedTouches[0].pageX;
            $y = _e.changedTouches[0].pageY;
        } else {
            $x = _e.pageX;
            $y = _e.pageY;
        }
        return { x: $x, y: $y };
    },
    //DOM没有提供insertAfter()方法
    insertAfter: function insertAfter(nowNode, newNode) {
        var parent = nowNode.parentNode;
        if (parent.lastChild == nowNode) {
            parent.appendChild(newNode);
        } else {
            parent.insertBefore(newNode, nowNode.nextSibling);
        }
    }
};

var css$1 = {
    init: function init() {
        // 初始化CSS样式
        var createCss = document.createElement('style');
        createCss.innerHTML = '\n        .js-mdropload{\n            z-index:1;\n            -webkit-transform: translateZ(0);   \n            transform: translateZ(0);\n            -webkit-backface-visibility: hidden;\n            backface-visibility: hidden;\n            -webkit-perspective: 1000;\n            perspective: 1000;\n        }\n        .js-mdropload-up {\n            position: absolute;\n            height:30px;\n            line-height:30px;\n            width: 100%;\n        }\n        .js-mdropload-up,.js-mdropload-down{\n            opacity:0;\n            text-align: center;\n        }\n        .js-mdropload-message {\n            opacity:0;\n        }\n        ';
        document.body.appendChild(createCss);
    }
};

var callback = function callback() {
    var that = this;
    var fn = {
        success: function success() {
            if (!that.isLock && that.status.loading) {
                console.log('success');
                fn.reset();
                that.upObj.innerHTML = that.opt.up.template.success;
                that.downObj.innerHTML = that.opt.down.template.success;
            }
        },
        reset: function reset() {
            that.status.loading = false;
            that.obj.css('transform', 'translate3d(0,0,0)');
            that.upObj.css('opacity', '0');
            that.downObj.css('opacity', '0');
        }
    };
    return fn;
};

var $hasTouch = "ontouchstart" in window;
var eventStart = $hasTouch ? "touchstart" : "mousedown";
var eventEnd = $hasTouch ? "touchend" : "mouseup";
var eventMove = $hasTouch ? "touchmove" : "mousemove";
var eventResize = $hasTouch ? "orientationchange" : "resize";
var eventcancel = $hasTouch ? "touchcancel" : "mouseup";

var touchEvent = {
    eventStart: eventStart, eventEnd: eventEnd, eventMove: eventMove, eventResize: eventResize, eventcancel: eventcancel
};

var _d = document;

var scroll = {
    // 获取滚动条高度
    getScrollTop: function getScrollTop() {
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
    getScrollHeight: function getScrollHeight() {
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
    getWindowHeight: function getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode === 'CSS1Compat') {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
};

var $that = window;
var $d = void 0;
var $b = void 0;
//$lock;
var _$touch;
// 加载成功
// let success = (function () {
//    let that = this;
//    if (!that.isLock && that.status.loading) {
//        that.status.loading = false;
//        that.obj.css('transform', 'translate3d(0,0,0)');
//        that.upObj.css('opacity', '0');
//        that.upObj.innerHTML = that.opt.up.template.success;
//        that.downObj.innerHTML = that.opt.down.template.success;
//    }
// });

_$touch = function $touch(element, _opt) {
    var $obj = null;
    var that = this;
    $d = $that.document;
    $b = $d.body;
    if (element == undefined) {
        $obj = $b;
    } else {
        $obj = element;
    }
    that.opt = _opt;
    // 动画时长
    that.opt.animationTime = that.opt.animationTime || .5;
    // 最大可拉取步长
    that.opt.windowHeight = window.innerHeight;
    that.obj = $obj;
    that.obj.css = function (key, value) {
        if (arguments.length === 2) {
            utils.css(this, key, value);
        } else {
            return this.style[key];
        }
    };

    // 事件缓存,以便销毁
    function touchstart(e) {
        _$touch.start.call(that, e);
    }

    function touchend(e) {
        _$touch.end.call(that, e);
    }

    function touchmove(e) {
        _$touch.move.call(that, e);
    }

    function touchresize(e) {
        _$touch.resize.call(that, e);
    }

    function touchcancel(e) {
        _$touch.cancel.call(that, e);
    }

    function transitionedn(e) {}

    function eventscroll(e) {
        // 已经在执行了，无需再次执行
        if (that.status.loading) return;
        if (scroll.getScrollTop() + scroll.getWindowHeight() >= scroll.getScrollHeight()) {
            // 到底
            that.status.loading = true;
            that.upObj.css('opacity', '1');
            that.opt.down && that.opt.down.fn(callback.call(that));
        }
    }

    $obj.addEventListener(touchEvent.eventStart, touchstart);
    $obj.addEventListener(touchEvent.eventEnd, touchend);
    $obj.addEventListener(touchEvent.eventMove, touchmove);
    window.addEventListener(touchEvent.eventResize, touchresize);
    $obj.addEventListener(touchEvent.eventcancel, touchcancel);
    $obj.addEventListener('transitionend', transitionedn);
    window.addEventListener('scroll', eventscroll);
    // 销毁
    that.destroy = function () {
        callback.call(that).reset();
        $obj.removeEventListener(touchEvent.eventStart, touchstart);
        $obj.removeEventListener(touchEvent.eventEnd, touchend);
        $obj.removeEventListener(touchEvent.eventMove, touchmove);
        $obj.removeEventListener(touchEvent.eventcancel, touchcancel);
        $obj.removeEventListener('transitionend', transitionedn);
        $obj.classList.remove('js-mdropload');
        window.removeEventListener(touchEvent.eventResize, touchresize);
        window.removeEventListener('scroll', eventscroll);
        // 节点回收
        try {
            that.upObj && that.obj.parentNode.removeChild(that.upObj);
            that.downObj && that.obj.parentNode.removeChild(that.downObj);
        } catch (err) {
            console.warn(err);
        }

        // 等待回收
        // that = null;
    };
    // 初始化CSS
    utils.css($obj, 'transform', 'translate3d(0,0,0)');
    utils.css($obj, 'position', 'relative', true);
    utils.css($obj, 'z-index', '20', true);
    utils.css($obj, 'transition-duration', that.opt.animationTime);
    that.initTemplate();
    that.status = {
        lock: false,
        loading: false
    };
    return that;
};

_$touch.prototype.initTemplate = function () {
    // 初始化上部分
    var $div;
    var that = this;
    if (!document.querySelector('.js-mdropload-up')) {
        $div = document.createElement('div');
        $div.innerHTML = that.opt.up.template.none;
        $div.className = 'js-mdropload-up';
        this.obj.parentNode.insertBefore($div, this.obj);
    }
    // 初始化下部分
    if (!this.obj.parentNode.querySelector('.js-mdropload-down')) {
        $div = document.createElement('div');
        $div.innerHTML = this.opt.up.template.none;
        $div.className = 'js-mdropload-down';
        utils.insertAfter(this.obj, $div);
    }
    that.upObj = this.obj.parentNode.querySelector('.js-mdropload-up');
    that.downObj = this.obj.parentNode.querySelector('.js-mdropload-down');
    //TODO: 此处需要优化
    that.upObj.css = utils.elementCSS.bind(that.upObj);
    that.downObj.css = utils.elementCSS.bind(that.downObj);
};

_$touch.start = function (e) {
    if (this.status.lock) return;
    // e.preventDefault();
    // 取当前transform高度
    this.offsetY = this.obj.css('transform').split(',')[1].replace('px', '').trim() * 1;
    if (isNaN(this.offsetY)) {
        this.offsetY = 0;
    }
    this.status.lock = true;
    this.status.loading = false;
    this.obj.css('transition-duration', '0s');
    this.upObj.css('transition-duration', '0s');
    this.startMouse = utils.mouseXY(e);
    // 再次初始化字符
    this.upObj.innerHTML = this.opt.up.template.none;
    this.downObj.innerHTML = this.opt.down.template.none;
};

_$touch.end = function (e) {
    if (this.status.lock) {
        e.stopPropagation();
        this.endMouse = utils.mouseXY(e);
        var mouseY = this.endMouse.y - this.startMouse.y;
        this.obj.css('transition-duration', '.5s');
        if (mouseY < this.opt.height) {
            this.obj.css('transform', 'translate3d(0,0px,0)');
        } else {
            this.obj.css('transform', 'translate3d(0,' + this.opt.height + 'px,0)');
        }
        this.upObj.css('transform', 'translate3d(0,0,0)');
        this.upObj.css('transition-duration', this.opt.animationTime + 's');
        // 操作完成之后的回调方法
        this.status.lock = false;
        var _cb = callback.call(this);
        // 查询是否到底部
        if (mouseY > this.opt.height) {
            this.upObj.innerHTML = this.opt.up.template.loading;
            this.status.loading = true;
            this.opt.up && this.opt.up.fn(_cb);
        } else {
            _cb.reset();
        }
    }
    // this.upObj.innerHTML = this.opt.up.template.none;
};
_$touch.move = function (e) {
    var that = this;
    if (that.status.lock) {
        var mouse = utils.mouseXY(e);
        var mouseY = mouse.y - that.startMouse.y;
        // 解决与iScroll冲突问题
        if (scroll.getScrollTop() === 0 && mouseY > 0) {
            e.preventDefault();
            // 判断是否固定距离,默认为一半屏幕高度
            if (mouseY > 0 && mouseY < that.opt.windowHeight) {
                var offset = (mouseY + that.offsetY) / 2;
                var opacity = (offset / that.opt.height).toFixed(2);
                opacity = opacity > 1 ? 1 : opacity;
                that.obj.css('transform', 'translate3d(0,' + offset + 'px,0)');
                that.upObj.css('opacity', opacity);
                // 操作下拉提示框
                var offsetUpobjHeight = (offset - that.opt.height) / 2;
                that.upObj.css('transform', 'translate3d(0,' + (offsetUpobjHeight < 0 ? 0 : offsetUpobjHeight) + 'px,0)');
            }
            if (mouseY > that.opt.height) {
                that.upObj.innerHTML = that.opt.up.template.message;
            }
        }
    }
};
_$touch.resize = function (e) {};
_$touch.cancel = function (e) {
    // fixbug touchend可能异常不触发
    callback.call(this).reset();
};

var core = (function (_el, _opt) {
    // 参数初始化
    css$1.init();
    // 如果_el传递进来是非ELEMENT 则进行转换
    if (!(_el instanceof Element)) {
        _el = document.querySelector(_el);
    }
    if (_el === null) {
        throw '1001:无法寻找到可设置的html节点,请确认后再次调用.';
    }
    _el.classList.add('js-mdropload');
    return new _$touch(_el, _opt);
});

var index_vue = {
    install: function install(vue, options) {
        vue.Mdropload = core;
    }
};

return index_vue;

})));
