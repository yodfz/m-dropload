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
        },
        mouseXY: function (_e) {
            // 用于扩展JQ的触摸事件
            var $x, $y;
            if (_e.originalEvent && _e.originalEvent.changedTouches) {
                $x = _e.originalEvent.changedTouches[0].pageX;
                $y = _e.originalEvent.changedTouches[0].pageY;
            } else if (_e.changedTouches) {
                $x = _e.changedTouches[0].pageX;
                $y = _e.changedTouches[0].pageY;
            }
            else {
                $x = _e.pageX;
                $y = _e.pageY;
            }
            return {x: $x, y: $y};
        },
        //DOM没有提供insertAfter()方法
        insertAfter: function (nowNode, newNode) {
            var parent = nowNode.parentNode;
            if (parent.lastChild == nowNode) {
                parent.appendChild(newNode);
            }
            else {
                parent.insertBefore(newNode, nowNode.nextSibling);
            }
        }
    };

    $touch = function (element, _opt) {
        var $obj = null;
        $d = $that.document;
        $b = $d.body;
        // _opt = {
        //     height // 移动多少的时候触发操作
        //     up:{
        //         fn:// 触发时间
        //         template:{
        //             none:''
        //             loading:''
        //             success:'',
        //                 error:''
        //         }
        //      } // 下拉触发操作
        //     eventDown // 上拉触发操作
        // }
        if (element == undefined) {
            $obj = $b;
        } else {
            $obj = element;
        }
        this.opt = _opt;
        this.opt.windowHeight = window.innerHeight;
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
        $utils.css($obj, 'position', 'relative');
        this.initTemplate();
        return this;
    };

    $touch.prototype.initTemplate = function () {
        // 初始化上部分
        console.log(this);
        var $div;
        if (!document.querySelector('.js-mdropload-up')) {
            $div = document.createElement('div');
            $div.innerHTML = this.opt.up.template.none;
            $div.className = 'js-mdropload-up';
            this.obj.parentNode.insertBefore($div, this.obj);
        }
        // 初始化下部分
        if (!document.querySelector('.js-mdropload-down')) {
            $div = document.createElement('div');
            $div.innerHTML = this.opt.up.template.none;
            $div.className = 'js-mdropload-down';
            $utils.insertAfter(this.obj, $div);
        }
        this.upObj = document.querySelector('.js-mdropload-up');
        this.downObj = document.querySelector('.js-mdropload-down');
    };

    $touch.start = function (e) {
        console.log('touch start');
        this.obj.css('transition-duration', '0s');
        this.startMouse = $utils.mouseXY(e);
    };
    $touch.end = function (e) {
        console.log('touch end');
        this.obj.css('transition-duration', '.5s');
        this.obj.css('transform', 'translateY(0px)');
        this.endMouse = $utils.mouseXY(e);
        var mouseY = this.endMouse.y - this.startMouse.y;
    };
    $touch.move = function (e) {
        console.log('touch move');
        var mouse = $utils.mouseXY(e);
        var mouseY = mouse.y - this.startMouse.y;
        console.log(mouseY);
        if (mouseY > 0) {
            this.obj.css('transform', 'translateY(' + mouseY + 'px)');
        }
    };
    $touch.resize = function (e) {

    };
    $touch.cancel = function (e) {
    };
    $that.Mdropload = function (_el, _opt) {
        return new $touch(_el, _opt);
    };
}).call(this, document);