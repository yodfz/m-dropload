let callback = function () {
    let that = this;
    let fn = {
        success () {
            console.log(that.status.lock , that.status.loading);
            if (!that.status.lock && that.status.loading) {
                fn.reset();
                if (that.opt.up.template.success) {
                    that.upObj.innerHTML = that.opt.up.template.success;
                }
                if (that.opt.down.template.success) {
                    console.log('修改文字');
                    that.downObj.innerHTML = that.opt.up.template.success;
                }
            }
        },
        reset (mouseY) {
            console.log(mouseY);
            that.obj.css('transform', 'translate3d(0,0,0)');
            that.upObj.css('opacity', '0');
            if (mouseY > 0) {
                that.status.bottomEvent = false;
                that.status.loading = false;
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