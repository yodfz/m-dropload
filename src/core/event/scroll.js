import scroll from '../lib/scroll';
import str from '../lib/str';
import callback from '../lib/callback';
var scrollTimeout = null;
export default function (e) {
    // 已经在执行了，无需再次执行
    let that = this;
    if (that.status.loading || that.status.bottomEvent) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function(){
            if (scroll.getScrollTop() + scroll.getWindowHeight() >= (scroll.getScrollHeight() - 50)) {
                // bottom event
                console.log('执行down');
                that.status.loading = true;
                that.status.bottomEvent = true;
                //setTimeout(function () {
                //    that.status.bottomEvent = false;
                //}, 500);
                that.downObj.css(str.o, '1', false);
                that.downObj.innerHTML = that.opt.down.template.loading;
                that.opt.down && that.opt.down.fn(callback.call(that));
            }else{
                console.log('不执行down')
            }
    },100);

}