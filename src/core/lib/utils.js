export default {
    prefix: (function () {
        var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice
                    .call(styles)
                    .join('')
                    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
            )[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    })(),
    css: function (obj, key, value, closePrefix) {
        obj.style[(closePrefix ? '' : $utils.prefix.css) + key] = value;
    },
    mouseXY: function (_e) {
        // 用于扩展JQ的触摸事件
        var $x, $y;
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