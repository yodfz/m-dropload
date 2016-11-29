import str from '../lib/str';
import $utils from '../lib/utils';
import callback from '../lib/callback';
import scrollevent from '../event/scroll';

export default function (e) {
    if (this.status.lock) {
        e&&e.preventDefault&&e.preventDefault();
        this.endMouse = $utils.mouseXY(e);
        var mouseY = this.endMouse.y - this.startMouse.y;
        this.obj.css(str.td, '.5s');
        if (mouseY < this.opt.height) {
            this.obj.css(str.tf, str.t3d + '(0,0px,0)');
        } else {
            this.obj.css(str.tf, str.t3d + '(0,' + this.opt.height + 'px,0)');
        }
        this.upObj.css(str.tf, str.t3d + '(0,0,0)');
        this.upObj.css(str.td, this.opt.animationTime + 's');
        // 操作完成之后的回调方法
        this.status.lock = false;
        var _cb = callback.call(this);
        // 查询是否可以释放更新
        if (mouseY > this.opt.height) {
            this.upObj.innerHTML = this.opt.up.template.loading;
            this.status.loading = true;
            this.opt.up && this.opt.up.fn(_cb);
        } else {
            _cb.reset(mouseY);
        }
        //if (mouseY <= 0) {
        //    this.downObj.innerHTML = this.opt.down.template.loading;
        //}
    }
    // this.upObj.innerHTML = this.opt.up.template.none;
};