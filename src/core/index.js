import $utils from './lib/utils';
import css from './lib/css';
import callback from './lib/callback';
import touchEvent from './lib/getTouchEvent';
import scroll from './lib/scroll';
import str from './lib/str';
import touchStart from './event/touchstart';
import touchEnd from './event/touchend';
import touchMove from './event/touchmove';
import touchCacnecl from './event/touchcancel';
import scrollEvent from './event/scroll';

let $that = window,
    $d,
    $b;
var $touch;

$touch = function (element, _opt) {
    let $obj = null;
    let that = this;
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
            $utils.css(this, key, value);
        } else {
            return this.style[key];
        }
    };
    // 判断是否需要对未注册方法进行屏蔽
    if (!that.opt.up) {
        that.opt.up = {
            isNull: true, template: {}, fn: ()=> {
            }
        };
    }
    if (!that.opt.down) {
        that.opt.down = {
            isNull: true, template: {}, fn: ()=> {
            }
        };
    }
    // 事件缓存,以便销毁
    // bind(that)?
    function touchstart(e) {
        touchStart.call(that, e);
    }

    function touchend(e) {
        touchEnd.call(that, e);
    }

    function touchmove(e) {
        touchMove.call(that, e);
    }

    function touchcancel(e) {
        touchCacnecl.call(that, e);
    }

    function transitionedn(e) {
    }

    function eventscroll(e) {
        scrollEvent.call(that,e);
    }

    $obj[str.a](touchEvent.eventStart, touchstart);
    $obj[str.a](touchEvent.eventEnd, touchend);
    $obj[str.a](touchEvent.eventMove, touchmove);
    $obj[str.a](touchEvent.eventcancel, touchcancel);
    $obj[str.a](str.te, transitionedn);
    window[str.a](str.scroll, eventscroll.bind(that));
    // 销毁
    that.destroy = function () {
        callback.call(that).reset();
        $obj[str.r](touchEvent.eventStart, touchstart);
        $obj[str.r](touchEvent.eventEnd, touchend);
        $obj[str.r](touchEvent.eventMove, touchmove);
        $obj[str.r](touchEvent.eventcancel, touchcancel);
        $obj[str.r](str.te, transitionedn);
        $obj.classList.remove(str.jmd);
        window[str.r](str.scroll, eventscroll);
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
    $utils.css($obj, str.tf, str.t3d + '(0,0,0)');
    $utils.css($obj, 'position', 'relative', true);
    $utils.css($obj, 'z-index', '20', true);
    $utils.css($obj, str.td, that.opt.animationTime);
    that.initTemplate();
    that.status = {
        lock: false,
        loading: false
    };
    return that;
};

$touch.prototype.cancel = function () {
    callback.call(this).reset();
};

$touch.prototype.initTemplate = function () {
    // 初始化上部分
    var $div;
    let that = this;
    if (!that.opt.up.isNull && !document.querySelector('.' + str.jmdUp)) {
        $div = document.createElement('div');
        $div.innerHTML = that.opt.up.template.none;
        $div.className = str.jmdUp;
        this.obj.parentNode.insertBefore($div, this.obj);
    }
    // 初始化下部分
    if (!this.opt.down.isNull && !this.obj.parentNode.querySelector('.' + str.jmdDown)) {
        $div = document.createElement('div');
        $div.innerHTML = this.opt.down.template.none;
        $div.className = str.jmdDown;
        $utils.insertAfter(this.obj, $div);
    }
    that.upObj = this.obj.parentNode.querySelector('.' + str.jmdUp);
    that.downObj = this.obj.parentNode.querySelector('.' + str.jmdDown);
    //TODO: 此处需要优化
    if (that.upObj) {
        that.upObj.css = $utils.elementCSS.bind(that.upObj);
    } else {
        that.upObj = {};
        that.upObj.css = function () {
        };
    }

    if (that.downObj) {
        that.downObj.css = $utils.elementCSS.bind(that.downObj);
    } else {
        that.downObj = {};
        that.downObj.css = function () {
        };
    }
};

export default (_el, _opt)=> {
    // 参数初始化
    css.init();
    // 如果_el传递进来是非ELEMENT 则进行转换
    if (!(_el instanceof Element)) {
        _el = document.querySelector(_el);
    }
    if (_el === null) {
        throw '1001:无法寻找到可设置的html节点,请确认后再次调用.';
    }
    _el.classList.add(str.jmd);
    let $fn = new $touch(_el, _opt);
    //$fn.prototype = $touch.prototype;
    return $fn;
}