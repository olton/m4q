var DEFAULT_DURATION = 1000;
var DEFAULT_EASING = "linear";

$.extend({
    fx: {
        off: false
    }
});

$.fn.extend({
    fadeIn: function(dur, easing, cb){
        return this.each(function(){
            var el = this;
            var $el = $(el);
            var visible = !(!isVisible(el) || (isVisible(el) && +($el.style('opacity')) === 0));

            if (visible) {
                return this;
            }

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = DEFAULT_DURATION;
            } else if (typeof dur === "function") {
                cb = dur;
                dur = DEFAULT_DURATION;
            }

            if (typeof easing === "function") {
                cb = easing;
                easing = DEFAULT_EASING;
            }

            if ($.fx.off) {
                dur = 0;
            }

            var originDisplay = $el.origin("display", undefined, 'block');

            el.style.opacity = "0";
            el.style.display = originDisplay;

            return $.animate({
                el: el,
                draw: {
                    opacity: 1
                },
                dur: dur,
                ease: easing,
                onDone: function(){
                    if (typeof cb === 'function') {
                        $.proxy(cb, this)();
                    }
                }
            })
        })
    },

    fadeOut: function(dur, easing, cb){
        return this.each(function(){
            var el = this;
            var $el = $(el);

            if ( !isVisible(el) ) return ;

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = DEFAULT_DURATION;
            } else
            if (typeof dur === "function") {
                cb = dur;
                dur = DEFAULT_DURATION;
            }
            if (typeof easing === "function") {
                cb = easing;
                easing = DEFAULT_EASING;
            }

            $el.origin("display", $el.style('display'));

            return $.animate({
                el: el,
                draw: {
                    opacity: 0
                },
                dur: dur,
                ease: easing,
                onDone: function(){
                    this.style.display = 'none';

                    if (typeof cb === 'function') {
                        $.proxy(cb, this)();
                    }
                }
            })
        })
    },

    slideUp: function(dur, easing, cb){
        return this.each(function(){
            var el = this;
            var $el = $(el);
            var currHeight;

            if ($el.height() === 0) return ;

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = DEFAULT_DURATION;
            } else
            if (typeof dur === "function") {
                cb = dur;
                dur = DEFAULT_DURATION;
            }
            if (typeof easing === "function") {
                cb = easing;
                easing = DEFAULT_EASING;
            }

            currHeight = $el.height();
            $el.origin("height", currHeight);
            $el.origin("display", $(el).style('display'));

            $el.css({
                overflow: "hidden"
            });

            return $.animate({
                el: el,
                draw: {
                    height: 0
                },
                dur: dur,
                ease: easing,
                onDone: function(){
                    $el.hide().removeStyleProperty("overflow, height");
                    if (typeof cb === 'function') {
                        $.proxy(cb, this)();
                    }
                }
            })
        })
    },

    slideDown: function(dur, easing, cb){
        return this.each(function(){
            var el = this;
            var $el = $(el);
            var targetHeight, originDisplay;

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = DEFAULT_DURATION;
            } else
            if (typeof dur === "function") {
                cb = dur;
                dur = DEFAULT_DURATION;
            }
            if (typeof easing === "function") {
                cb = easing;
                easing = DEFAULT_EASING;
            }

            $el.show().visible(false);
            targetHeight = +$el.origin("height", undefined, $el.height());
            if (parseInt(targetHeight) === 0) {
                targetHeight = el.scrollHeight;
            }
            originDisplay = $el.origin("display", $el.style('display'), "block");
            $el.height(0).visible(true);

            $el.css({
                overflow: "hidden",
                display: originDisplay === "none" ? "block" : originDisplay
            });

            return $.animate({
                el: el,
                draw: {
                    height: targetHeight
                },
                dur: dur,
                ease: easing,
                onDone: function(){
                    $(el).removeStyleProperty("overflow, height, visibility");
                    if (typeof cb === 'function') {
                        $.proxy(cb, this)();
                    }
                }
            })
        })
    },

    moveTo: function(x, y, dur, easing, cb){
        var draw = {
            top: y,
            left: x
        }

        if (typeof dur === "function") {
            cb = dur;
            dur = DEFAULT_DURATION;
            easing = DEFAULT_EASING;
        }

        if (typeof easing === "function") {
            cb = easing;
            easing = DEFAULT_EASING;
        }

        return this.each(function(){
            $.animate({
                el: this,
                draw: draw,
                dur: dur,
                ease: easing,
                onDone: cb
            })
        })
    },

    centerTo: function(x, y, dur, easing, cb){
        if (typeof dur === "function") {
            cb = dur;
            dur = DEFAULT_DURATION;
            easing = DEFAULT_EASING;
        }

        if (typeof easing === "function") {
            cb = easing;
            easing = DEFAULT_EASING;
        }

        return this.each(function(){
            var draw = {
                left: x - this.clientWidth / 2,
                top: y - this.clientHeight / 2
            };
            $.animate({
                el: this,
                draw: draw,
                dur: dur,
                ease: easing,
                onDone: cb
            })
        })
    },

    colorTo: function(color, dur, easing, cb){
        var draw = {
            color: color
        }

        if (typeof dur === "function") {
            cb = dur;
            dur = DEFAULT_DURATION;
            easing = DEFAULT_EASING;
        }

        if (typeof easing === "function") {
            cb = easing;
            easing = DEFAULT_EASING;
        }

        return this.each(function(){
            $.animate({
                el: this,
                draw: draw,
                dur: dur,
                ease: easing,
                onDone: cb
            })
        })
    },

    backgroundTo: function(color, dur, easing, cb){
        var draw = {
            backgroundColor: color
        }

        if (typeof dur === "function") {
            cb = dur;
            dur = DEFAULT_DURATION;
            easing = DEFAULT_EASING;
        }

        if (typeof easing === "function") {
            cb = easing;
            easing = DEFAULT_EASING;
        }

        return this.each(function(){
            $.animate({
                el: this,
                draw: draw,
                dur: dur,
                ease: easing,
                onDone: cb
            })
        })
    }
});