import str from '../lib/str';
import $utils from '../lib/utils';

export default function (e) {
    if (this.status.lock) return;
    // 判断是否在可视范围之内
    var top = this.obj.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight) {
        return;
    }
    // e.preventDefault();
    // 取当前tf高度
    this.offsetY = this.obj.css(str.tf).split(',')[1].replace('px', '').trim() * 1;
    if (isNaN(this.offsetY)) {
        this.offsetY = 0;
    }
    this.status.lock = true;
    this.obj.css(str.td, '0s');
    this.upObj.css(str.td, '0s');
    this.downObj.css(str.o, '1');
    this.startMouse = $utils.mouseXY(e);
    // 再次初始化字符
    this.upObj.innerHTML = this.opt.up.template.none;
    // this.downObj.innerHTML = this.opt.down.template.none;
}