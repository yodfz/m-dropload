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
    css: function css(obj, key, value, closePrefix) {
        obj.style[(closePrefix ? '' : this.prefix.css) + key] = value;
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
        createCss.innerHTML = '\n        .js-mdropload{\n            z-index:1;\n        }\n        .js-mdropload-up {\n            position: absolute;\n            text-align: center;\n            width: 100%;\n            opacity:0;\n            transition-duration: .2s;\n        }\n        .js-mdropload-message {\n            opacity:0;\n        }\n        ';
        document.body.appendChild(createCss);
    }
};

var callback = function callback() {
    var that = this;
    var fn = {
        success: function success() {
            if (!that.isLock && that.status.loading) {
                fn.reset();
                that.upObj.innerHTML = that.opt.up.template.success;
                that.downObj.innerHTML = that.opt.down.template.success;
            }
        },
        reset: function reset() {
            that.status.loading = false;
            that.obj.css('transform', 'translate3d(0,0,0)');
            that.upObj.css('opacity', '0');
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
    that.opt.windowHeight = window.innerHeight / 5;
    that.obj = $obj;
    that.obj.css = function (key, value) {
        if (arguments.length === 2) {
            utils.css(this, key, value);
        } else {
            return this.style[key];
        }
    };
    $obj.addEventListener(touchEvent.eventStart, function (e) {
        _$touch.start.call(that, e);
    });

    $obj.addEventListener(touchEvent.eventEnd, function (e) {
        _$touch.end.call(that, e);
    });

    $obj.addEventListener(touchEvent.eventMove, function (e) {
        _$touch.move.call(that, e);
    });
    window.addEventListener(touchEvent.eventResize, function (e) {
        _$touch.resize.call(that, e);
    });

    $obj.addEventListener(touchEvent.eventcancel, function (e) {
        _$touch.cancel.call(that, e);
    });
    $obj.addEventListener('transitionend', function (e) {
        console.log('transitionend');
    });
    window.addEventListener('scroll', function (e) {
        // 已经在执行了，无需再次执行
        if (that.status.loading) return;
        if (scroll.getScrollTop() + scroll.getWindowHeight() >= scroll.getScrollHeight()) {
            console.log('go to bottom');
            // 到底
            that.status.loading = true;

            that.opt.down.fn(callback.call(that));
        }
    });
    // 初始化CSS
    utils.css($obj, 'transform', 'translate3d(0,0,0)');
    utils.css($obj, 'position', 'relative', true);
    utils.css($obj, 'z-index', '20', true);
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
    if (!document.querySelector('.js-mdropload-down')) {
        $div = document.createElement('div');
        $div.innerHTML = this.opt.up.template.none;
        $div.className = 'js-mdropload-down';
        utils.insertAfter(this.obj, $div);
    }
    that.upObj = document.querySelector('.js-mdropload-up');
    that.downObj = document.querySelector('.js-mdropload-down');
    //TODO: 此处需要优化
    that.upObj.css = utils.elementCSS.bind(that.upObj);
    that.downObj.css = utils.elementCSS.bind(that.downObj);
};

_$touch.start = function (e) {
    console.log('touch start');
    // 取当前transform高度
    this.offsetY = this.obj.css('transform').split(',')[1].replace('px', '').trim() * 1;
    if (isNaN(this.offsetY)) {
        this.offsetY = 0;
    }
    this.status.lock = true;
    this.status.loading = false;
    this.obj.css('transition-duration', '0s');
    this.startMouse = utils.mouseXY(e);
};

_$touch.end = function (e) {
    console.log('touch end');
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
        // 操作完成之后的回调方法
        this.status.lock = false;
        var _cb = callback.call(this);
        // 查询是否到底部
        if (mouseY > this.opt.height) {
            this.upObj.innerHTML = this.opt.up.template.loading;
            this.status.loading = true;
            this.opt.up.fn(_cb);
        } else {
            _cb.success();
        }
    }
    // this.upObj.innerHTML = this.opt.up.template.none;
};
_$touch.move = function (e) {
    var that = this;
    if (that.status.lock) {
        if (scroll.getScrollTop() === 0) {
            console.log('touch move');
            e.preventDefault();
            var mouse = utils.mouseXY(e);
            var mouseY = mouse.y - that.startMouse.y;
            if (mouseY > 0 && mouseY < that.opt.windowHeight) {
                var offset = mouseY + that.offsetY;
                var opacity = (offset / that.opt.height).toFixed(2);
                opacity = opacity > 1 ? 1 : opacity;
                that.obj.css('transform', 'translate3d(0,' + offset + 'px,0)');
                that.upObj.css('opacity', opacity);
            }
            if (mouseY > that.opt.height) {
                that.upObj.innerHTML = that.opt.up.template.message;
            }
        }
    }
};
_$touch.resize = function (e) {};
_$touch.cancel = function (e) {};

var index = (function (_el, _opt) {
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

return index;

})));
