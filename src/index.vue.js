import core from './core/index';

export default  {
    install (vue, options) {
        vue.prototype.Mdropload = core;
        vue.Mdropload = core;
    }
};