import $utils from './lib/utils';
import scroll from './lib/scroll';
import touchEvent from './lib/getTouchEvent';
let $that = window,
    $d,
    $b;
//$lock;
var $touch;
let success = (function () {
    let that = this;
    if (!this.isLock && this.status.loading) {
        this.status.loading = false;
        this.obj.css('transform', 'translate3d(0,0,0)');
        this.upObj.innerHTML = this.opt.up.template.success;
    }
});

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
    $obj.addEventListener(touchEvent.eventStart, (e) => {
        $touch.start.call(that, e);
    });

    $obj.addEventListener(touchEvent.eventEnd, (e) => {
        $touch.end.call(that, e);
    });

    $obj.addEventListener(touchEvent.eventMove, (e) => {
        $touch.move.call(that, e);
    });
    window.addEventListener(touchEvent.eventResize, (e) => {
        $touch.resize.call(that, e);
    });

    $obj.addEventListener(touchEvent.eventcancel, (e) => {
        $touch.cancel.call(that, e);
    });
    $obj.addEventListener('transitionend', (e) => {
        console.log('transitionend');
    });
    window.addEventListener('scroll', (e) => {
        if (scroll.getScrollTop() + scroll.getWindowHeight() >= scroll.getScrollHeight() - 50) {
            console.log('go to bottom');
            // 到底
            that.status.loading = true;
            that.opt.down.fn(success.bind(that));
        }
    });
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
};

$touch.start = function (e) {
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
};

$touch.end = function (e) {
    console.log('touch end');
    if (this.status.lock) {
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
        var _success = success.bind(this);

        if (mouseY > this.opt.height) {
            this.upObj.innerHTML = this.opt.up.template.loading;
            this.status.loading = true;
            this.opt.up.fn(_success);
        } else {
            _success();
        }
    }
    // this.upObj.innerHTML = this.opt.up.template.none;
};
$touch.move = function (e) {
    let that = this;
    if (that.status.lock) {
        console.log('touch move');
        e.preventDefault();
        if (scroll.getScrollTop() === 0) {
            var mouse = $utils.mouseXY(e);
            var mouseY = mouse.y - that.startMouse.y;
            if (mouseY > 0 && mouseY < that.opt.windowHeight) {
                this.obj.css('transform', 'translate3d(0,' + (mouseY + that.offsetY) + 'px,0)');
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
    // 如果_el传递进来是非ELEMENT 则进行转换
    if (!(_el instanceof Element)) {
        _el = document.querySelector(_el);
    }
    if(_el === null) {
        throw '1001:无法寻找到可设置的html节点,请确认后再次调用.';
    }
    return new $touch(_el, _opt);
}