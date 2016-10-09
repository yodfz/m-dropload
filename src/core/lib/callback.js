let callback = {
    success () {
        let that = this;
        if (!that.isLock && that.status.loading) {
            callback.reset();
            that.upObj.innerHTML = that.opt.up.template.success;
            that.downObj.innerHTML = that.opt.down.template.success;
        }
    },
    reset () {
        let that = this;
        that.status.loading = false;
        that.obj.css('transform', 'translate3d(0,0,0)');
        that.upObj.css('opacity', '0');
    }
};
export default callback;