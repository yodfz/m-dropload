import callback from '../lib/callback';

export default function (e) {
    // fixbug touchend可能异常不触发
    callback.call(this).reset();
};