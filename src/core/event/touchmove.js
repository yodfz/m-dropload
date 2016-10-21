import str from '../lib/str';
import $utils from '../lib/utils';
import scroll from '../lib/scroll';

export default function (e) {
    let that = this;
    if (that.status.lock) {
        var mouse = $utils.mouseXY(e);
        var mouseY = mouse.y - that.startMouse.y;
        // 解决与iScroll冲突问题
        if (scroll.getScrollTop() === 0 && mouseY > 0) {
            console.log('move');
            e.preventDefault();
            // 判断是否固定距离,默认为一半屏幕高度
            if (mouseY > 0 && mouseY < that.opt.windowHeight) {
                var offset = (mouseY + that.offsetY) / 2;
                var o = (offset / that.opt.height).toFixed(2);
                o = o > 1 ? 1 : o;
                that.obj.css(str.tf, str.t3d + '(0,' + offset + 'px,0)');
                that.upObj.css(str.o, o);
                // 操作下拉提示框
                let offsetUpobjHeight = (offset - that.opt.height) / 2;
                that.upObj.css(str.tf, str.t3d + '(0,' + (offsetUpobjHeight < 0 ? 0 : offsetUpobjHeight) + 'px,0)');
            }
            if (mouseY > that.opt.height) {
                that.upObj.innerHTML = that.opt.up.template.message;
            }
        }
    }
};