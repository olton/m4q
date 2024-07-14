$.extend({
    fx: {
        off: false
    }
});

$.fn.extend({
    fadeIn: function(dur, easing, cb){
        return this.each(function(){
            const el = this;
            const $el = $(el);
            const visible = !(!isVisible(el) || (isVisible(el) && +($el.style('opacity')) === 0));

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = $.animation.duration;
            } else if (typeof dur === "function") {
                cb = dur;
                dur = $.animation.duration;
            }

            if (typeof easing === "function") {
                cb = easing;
                easing = $.animation.ease;
            }

            if ($.fx.off) {
                dur = 0;
            }

            if (visible) {
                if (typeof cb === 'function') {
                    $.proxy(cb, this)();
                }
                return this;
            }

            const originDisplay = $el.origin("display", undefined, 'block');

            el.style.opacity = "0";
            el.style.display = originDisplay;

            return $.animate({
                el,
                draw: {
                    opacity: 1
                },
                dur,
                ease: easing,
                onDone: function(){
                    if (typeof cb === 'function') {
                        $.proxy(cb, this)();
                    }
                }
            });
        });
    },

    fadeOut: function(dur, easing, cb){
        return this.each(function(){
            const el = this;
            const $el = $(el);

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = $.animation.duration;
            } else
            if (typeof dur === "function") {
                cb = dur;
                dur = $.animation.duration;
            }
            if (typeof easing === "function") {
                cb = easing;
                easing = $.animation.ease;
            }

            $el.origin("display", $el.style('display'));

            if ( !isVisible(el) ) {
                if (typeof cb === 'function') {
                    $.proxy(cb, this)();
                }
                return this;
            }

            return $.animate({
                el,
                draw: {
                    opacity: 0
                },
                dur,
                ease: easing,
                onDone: function(){
                    this.style.display = 'none';

                    if (typeof cb === 'function') {
                        $.proxy(cb, this)();
                    }
                }
            });
        });
    },

    slideUp: function(dur, easing, cb){
        return this.each(function(){
            const el = this;
            const $el = $(el);
            let currHeight;

            if ($el.height() === 0) return ;

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = $.animation.duration;
            } else
            if (typeof dur === "function") {
                cb = dur;
                dur = $.animation.duration;
            }
            if (typeof easing === "function") {
                cb = easing;
                easing = $.animation.ease;
            }

            currHeight = $el.height();
            $el.origin("height", currHeight);
            $el.origin("display", $(el).style('display'));

            $el.css({
                overflow: "hidden"
            });

            return $.animate({
                el,
                draw: {
                    height: 0
                },
                dur,
                ease: easing,
                onDone: function(){
                    $el.hide().removeStyleProperty("overflow, height");
                    if (typeof cb === 'function') {
                        $.proxy(cb, this)();
                    }
                }
            });
        });
    },

    slideDown: function(dur, easing, cb){
        return this.each(function(){
            const el = this;
            const $el = $(el);
            let targetHeight, originDisplay;

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = $.animation.duration;
            } else
            if (typeof dur === "function") {
                cb = dur;
                dur = $.animation.duration;
            }
            if (typeof easing === "function") {
                cb = easing;
                easing = $.animation.ease;
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
                el,
                draw: {
                    height: targetHeight
                },
                dur,
                ease: easing,
                onDone: function(){
                    $(el).removeStyleProperty("overflow, height, visibility");
                    if (typeof cb === 'function') {
                        $.proxy(cb, this)();
                    }
                }
            });
        });
    },

    moveTo: function(x, y, dur, ease, cb){
        const draw = {
            top: y,
            left: x
        };

        if (typeof dur === "function") {
            cb = dur;
            dur = $.animation.duration;
            ease = $.animation.ease;
        }

        if (typeof ease === "function") {
            cb = ease;
            ease = $.animation.ease;
        }

        return this.each(function(){
            $.animate({
                el: this,
                draw,
                dur,
                ease,
                onDone: cb
            });
        });
    },

    centerTo: function(x, y, dur, ease, cb){
        if (typeof dur === "function") {
            cb = dur;
            dur = $.animation.duration;
            ease = $.animation.ease;
        }

        if (typeof ease === "function") {
            cb = ease;
            ease = $.animation.ease;
        }

        return this.each(function(){
            const draw = {
                left: x - this.clientWidth / 2,
                top: y - this.clientHeight / 2
            };
            $.animate({
                el: this,
                draw,
                dur,
                ease,
                onDone: cb
            });
        });
    },

    colorTo: function(color, dur, easing, cb){
        const draw = {
            color: color
        };

        if (typeof dur === "function") {
            cb = dur;
            dur = $.animation.duration;
            easing = $.animation.ease;
        }

        if (typeof easing === "function") {
            cb = easing;
            easing = $.animation.ease;
        }

        return this.each(function(){
            $.animate({
                el: this,
                draw,
                dur,
                ease: easing,
                onDone: cb
            });
        });
    },

    backgroundTo: function(color, dur, easing, cb){
        const draw = {
            backgroundColor: color
        };

        if (typeof dur === "function") {
            cb = dur;
            dur = $.animation.duration;
            easing = $.animation.ease;
        }

        if (typeof easing === "function") {
            cb = easing;
            easing = $.animation.ease;
        }

        return this.each(function(){
            $.animate({
                el: this,
                draw,
                dur,
                ease: easing,
                onDone: cb
            });
        });
    }
});