let utils = {
    //prefix: (function () {
    //    var styles = window.getComputedStyle(document.documentElement, ''),
    //        pre = (Array.prototype.slice
    //                .call(styles)
    //                .join('')
    //                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    //        )[1],
    //        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    //    return {
    //        dom: dom,
    //        lowercase: pre,
    //        css: '-' + pre + '-',
    //        js: pre[0].toUpperCase() + pre.substr(1)
    //    };
    //})(),
    /**
     *
     * @param obj
     * @param key
     * @param value
     * @param closePrefix 是否关闭前缀
     */
    css: function (obj, key, value, closePrefix) {
        // fixbug vivo and xiaomi
        obj.style[key] = value;
        if (!closePrefix) {
            obj.style['-webkit-' + key] = value;
        }
    },
    elementCSS: function (key, value) {
        if (arguments.length === 2) {
            utils.css(this, key, value);
        } else {
            return this.style[key];
        }
    },
    mouseXY: function (_e) {
        // 用于扩展JQ的触摸事件
        var $x, $y;
        if (!_e) {
            return {x: 0, y: 0}
        }
        if (_e.originalEvent && _e.originalEvent.changedTouches) {
            $x = _e.originalEvent.changedTouches[0].pageX;
            $y = _e.originalEvent.changedTouches[0].pageY;
        } else if (_e.changedTouches) {
            $x = _e.changedTouches[0].pageX;
            $y = _e.changedTouches[0].pageY;
        }
        else {
            $x = _e.pageX;
            $y = _e.pageY;
        }
        return {x: $x, y: $y};
    },
    //DOM没有提供insertAfter()方法
    insertAfter: function (nowNode, newNode) {
        var parent = nowNode.parentNode;
        if (parent.lastChild == nowNode) {
            parent.appendChild(newNode);
        }
        else {
            parent.insertBefore(newNode, nowNode.nextSibling);
        }
    }
};
export default utils;