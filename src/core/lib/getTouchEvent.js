let $hasTouch = "ontouchstart" in $that;
let eventStart = $hasTouch ? "touchstart" : "mousedown",
    eventEnd = $hasTouch ? "touchend" : "mouseup",
    eventMove = $hasTouch ? "touchmove" : "mousemove",
    eventResize = $hasTouch ? "orientationchange" : "resize",
    eventcancel = $hasTouch ? "touchcancel" : "mouseup";

export default {
    eventStart, eventEnd, eventMove, eventResize, eventcancel
};