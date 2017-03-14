let $hasTouch = "ontouchstart" in window;
let eventStart = $hasTouch ? "touchstart" : "mousedown",
    eventEnd = $hasTouch ? "touchend" : "mouseup",
    eventMove = $hasTouch ? "touchmove" : "mousemove",
    eventResize = $hasTouch ? "orientationchange" : "resize",
    eventcancel = $hasTouch ? "touchcancel" : "mouseup";

export default {
    start: eventStart,
    end: eventEnd,
    move: eventMove,
    resize: eventResize,
    cancel: eventcancel
};