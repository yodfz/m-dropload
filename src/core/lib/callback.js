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
        reset () {
            that.status.loading = false;
            that.obj.css('transform', 'translate3d(0,0,0)');
            that.upObj.css('opacity', '0');
            that.downObj.css('opacity', '0');
        }
    };
    return fn;
};
export default callback;