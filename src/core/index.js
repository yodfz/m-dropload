import $utils from './lib/utils';
import scroll from './lib/scroll';
import touchEvent from './lib/getTouchEvent';

let $that = window,
    $d,
    $b;
//$lock;
let $touch;
let success = (function () {
    let that = this;
    if (!this.isLock && this.status.loading) {
        this.status.loading = false;
        this.obj.css('transform', 'translate3d(0,0,0)');
        this.upObj.innerHTML = this.opt.up.template.success;
    }
});

$touch = (element, _opt) => {
    let $obj = null;
    $d = $that.document;
    $b = $d.body;
    if (element == undefined) {
        $obj = $b;
    } else {
        $obj = element;
    }
    this.opt = _opt;
    this.opt.windowHeight = window.innerHeight / 5;
    this.obj = $obj;
    this.obj.css = function (key, value) {
        if (arguments.length === 2) {
            $utils.css(this, key, value);
        } else {
            return this.style[key];
        }
    };
    let that = this;
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
    this.initTemplate();
    this.status = {
        lock: false,
        loading: false
    };
    return this;
};

$touch.prototype.initTemplate = () => {
    // 初始化上部分
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

$touch.start = (e) => {
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

$touch.end = (e) => {
    console.log('touch end');
    if (this.status.lock) {
        this.endMouse = $utils.mouseXY(e);
        var mouseY = this.endMouse.y - this.startMouse.y;
        // 操作完成之后的回调方法
        this.status.lock = false;
        var _success = success.bind(this);
        this.obj.css('transition-duration', '.5s');
        this.obj.css('transform', 'translate3d(0,' + this.opt.height + 'px,0)');
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
$touch.move = (e) => {
    if (this.status.lock) {
        console.log('touch move');
        e.preventDefault();
        if (getScrollTop() === 0) {
            var mouse = $utils.mouseXY(e);
            var mouseY = mouse.y - this.startMouse.y;
            if (mouseY > 0 && mouseY < this.opt.windowHeight) {
                this.obj.css('transform', 'translate3d(0,' + (mouseY + this.offsetY) + 'px,0)');
            }
            if (mouseY > this.opt.height) {
                this.upObj.innerHTML = this.opt.up.template.message;
            }
        }
    }
};
$touch.resize = (e) => {

};
$touch.cancel = (e) => {
};

export default (_el, _opt)=> {
    return new $touch(_el, _opt);
}