let callback = function () {
    let that = this;
    let fn = {
        success () {
            if (!that.isLock && that.status.loading) {
                console.log('success');
                fn.reset();
                that.upObj.innerHTML = that.opt.up.template.success;
                that.downObj.innerHTML = that.opt.down.template.success;
            }
        },
        reset (mouseY) {
            that.status.loading = false;
            that.obj.css('transform', 'translate3d(0,0,0)');
            that.upObj.css('opacity', '0');
            if (mouseY > 0) {
                that.downObj.css('opacity', '0');
            }
        },
        // 提供给底部加载下一页使用
        end () {
            that.downObj.innerHTML = that.opt.down.template.end;
            fn.reset();
        }
    };
    return fn;
};
export default callback;