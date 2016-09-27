/*
 下拉OR上拉刷新模块
 * */
(function () {
    "use strict";
    var $that = this,
        $d,
        $b;
    //$lock;
    var $hasTouch = "ontouchstart" in $that;
    var $eventStart = $hasTouch ? "touchstart" : "mousedown",
        $eventEnd = $hasTouch ? "touchend" : "mouseup",
        $eventMove = $hasTouch ? "touchmove" : "mousemove",
        $eventResize = $hasTouch ? "orientationchange" : "resize",
        $eventcancel = $hasTouch ? "touchcancel" : "mouseup";
    var $touch;

    var $utils = {
        prefix: (function () {
            var styles = window.getComputedStyle(document.documentElement, ''),
                pre = (Array.prototype.slice
                        .call(styles)
                        .join('')
                        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                )[1],
                dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
            return {
                dom: dom,
                lowercase: pre,
                css: '-' + pre + '-',
                js: pre[0].toUpperCase() + pre.substr(1)
            };
        })(),
        css: function (obj, key, value) {
            obj.style[$utils.prefix.css + key] = value;
        }
    };

    $touch = function (element) {
        var $obj = null;
        $d = $that.document;
        $b = $d.body;
        if (element == undefined) {
            $obj = $b;
        } else {
            $obj = element;
        }
        this.obj = $obj;
        this.obj.css = function (key, value) {
            $utils.css(this, key, value);
        };
        var that = this;
        $obj.addEventListener($eventStart, function (e) {
            $touch.start.call(that, e);
        });

        $obj.addEventListener($eventEnd, function (e) {
            $touch.end.call(that, e);
        });

        $obj.addEventListener($eventMove, function (e) {
            $touch.move.call(that, e);
        });
        window.addEventListener($eventResize, function (e) {
            $touch.resize.call(that, e);
        });

        $obj.addEventListener($eventcancel, function (e) {
            $touch.cancel.call(that, e);
        });
        // 初始化CSS
        $utils.css($obj, 'transform', 'translateZ(0px)');
        return this;
    };

    $touch.start = function (e) {
        console.log('touch start');
        this.obj.css('transition-duration', '0')
    };
    $touch.end = function (e) {
        console.log('touch end');
        this.obj.css('transition-duration', '.5s')

    };
    $touch.move = function (e) {
        console.log('touch move');

    };
    $touch.resize = function (e) {

    };
    $touch.cancel = function (e) {
    };
    $that.Mdropload = function (_el) {
        return new $touch(_el);
    };
}).call(this, document);