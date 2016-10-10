import $utils from './lib/utils';
import css from './lib/css';
import callback from './lib/callback';
import touchEvent from './lib/getTouchEvent';
import scroll from './lib/scroll';

let $that = window,
    $d,
    $b;
//$lock;
var $touch;
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
    that.opt.windowHeight = window.innerHeight / 5;
    that.obj = $obj;
    that.obj.css = function (key, value) {
        if (arguments.length === 2) {
            $utils.css(this, key, value);
        } else {
            return this.style[key];
        }
    };


    // 事件缓存,以便销毁
    function touchstart (e) {
        $touch.start.call(that, e);
    }
    function touchend(e) {
        $touch.end.call(that, e);
    }
    function touchmove(e) {
        $touch.move.call(that, e);
    }
    function touchresize(e) {
        $touch.resize.call(that, e);
    }
    function touchcancel(e) {
        $touch.cancel.call(that, e);
    }
    function transitionedn(e) {
        console.log('transitionend');
    }
    function eventscroll(e) {
        // 已经在执行了，无需再次执行
        if (that.status.loading) return;
        if (scroll.getScrollTop() + scroll.getWindowHeight() >= scroll.getScrollHeight()) {
            console.log('go to bottom');
            // 到底
            that.status.loading = true;
            that.opt.down.fn(callback.call(that));
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
        console.log('load destroy');
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
        that.upObj&&document.body.removeChild(that.upObj);
        that.downObj&&document.body.removeChild(that.downObj);
        // 等待回收
        // that = null;
    };
    // 初始化CSS
    $utils.css($obj, 'transform', 'translate3d(0,0,0)');
    $utils.css($obj, 'position', 'relative', true);
    $utils.css($obj, 'z-index', '20', true);
    that.initTemplate();
    that.status = {
        lock: false,
        loading: false
    };
    return that;
};

$touch.prototype.initTemplate = function () {
    // 初始化上部分
    var $div;
    let that = this;
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
        $utils.insertAfter(this.obj, $div);
    }
    that.upObj = document.querySelector('.js-mdropload-up');
    that.downObj = document.querySelector('.js-mdropload-down');
    //TODO: 此处需要优化
    that.upObj.css = $utils.elementCSS.bind(that.upObj);
    that.downObj.css = $utils.elementCSS.bind(that.downObj);
};

$touch.start = function (e) {
    if(his.status.lock) return;
    console.log('touch start');
    // 取当前transform高度
    this.offsetY = this.obj.css('transform').split(',')[1].replace('px', '').trim() * 1;
    if (isNaN(this.offsetY)) {
        this.offsetY = 0;
    }
    this.status.lock = true;
    this.status.loading = false;
    this.obj.css('transition-duration', '0s');
    this.startMouse = $utils.mouseXY(e);
    // 再次初始化字符
    this.upObj.innerHTML = this.opt.up.template.none;
    this.downObj.innerHTML = this.opt.down.template.none;
};

$touch.end = function (e) {
    if (this.status.lock) {
        e.stopPropagation();
        this.endMouse = $utils.mouseXY(e);
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
            _cb.reset();
        }
    }
    // this.upObj.innerHTML = this.opt.up.template.none;
};
$touch.move = function (e) {
    let that = this;
    if (that.status.lock) {
        var mouse = $utils.mouseXY(e);
        var mouseY = mouse.y - that.startMouse.y;
        // 解决与iScroll冲突问题
        if (scroll.getScrollTop() === 0 && mouseY>0) {
            e.preventDefault();
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
$touch.resize = function (e) {

};
$touch.cancel = function (e) {
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
    _el.classList.add('js-mdropload');
    return new $touch(_el, _opt);
}