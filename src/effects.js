$.extend({
    fx: {
        off: false
    },

    fadeIn: function(el, dur, easing, cb){
        var $el = $(el), s = $el.style();

        if ( s["display"] !== 'none' ) return ;

        if (not(dur) && not(easing) && not(cb)) {
            cb = null;
            dur = 1000;
        } else

        if (typeof dur === "function") {
            cb = dur;
            dur = 1000;
        }

        if (typeof easing === "function") {
            cb = easing;
            easing = "linear";
        }

        var originDisplay = $(el).origin("display", undefined, 'block');

        el.style.opacity = "0";
        el.style.display = originDisplay;

        return this.animate(el, {
            opacity: 1
        }, dur, easing, function(){
            this.style.removeProperty('opacity');

            if (typeof cb === 'function') {
                $.proxy(cb, this)();
            }
        });
    },

    fadeOut: function(el, dur, easing, cb){
        var $el = $(el), s = $el.style();

        if ( s["display"] === 'none' ||  parseInt(s["opacity"]) === 0) return ;

        if (not(dur) && not(easing) && not(cb)) {
            cb = null;
            dur = 1000;
        } else
        if (typeof dur === "function") {
            cb = dur;
            dur = 1000;
        }
        if (typeof easing === "function") {
            cb = easing;
            easing = "linear";
        }

        $el.origin("display", $(el).style('display'));

        return this.animate(el, {
            opacity: 0
        }, dur, easing, function(){
            this.style.display = 'none';
            this.style.removeProperty('opacity');

            if (typeof cb === 'function') {
                $.proxy(cb, this)();
            }
        });
    },

    slideDown: function(el, dur, easing, cb) {
        var $el = $(el);
        var targetHeight, originDisplay;

        if (!isNaN($el.height()) && $el.height() !== 0) return ;

        if (not(dur) && not(easing) && not(cb)) {
            cb = null;
            dur = 100;
        } else
        if (typeof dur === "function") {
            cb = dur;
            dur = 100;
        }
        if (typeof easing === "function") {
            cb = easing;
            easing = "linear";
        }

        $el.show().visible(false);
        targetHeight = $el.origin("height", undefined, $el.height());
        originDisplay = $el.origin("display", $(el).style('display'), "block");
        $el.height(0).visible(true);

        $el.css({
            overflow: "hidden",
            display: originDisplay === "none" ? "block" : originDisplay
        });

        return this.animate(el, function(t, p){
            el.style.height = (targetHeight * p) + "px";
            if (t === 1) {
                $(el).removeStyleProperty("overflow, height, visibility");
            }
        }, dur, easing, cb);
    },

    slideUp: function(el, dur, easing, cb) {
        var $el = $(el);
        var currHeight;

        if ($el.height() === 0) return ;

        if (not(dur) && not(easing) && not(cb)) {
            cb = null;
            dur = 100;
        } else
        if (typeof dur === "function") {
            cb = dur;
            dur = 100;
        }
        if (typeof easing === "function") {
            cb = easing;
            easing = "linear";
        }

        currHeight = $el.height();
        $el.origin("height", currHeight);
        $el.origin("display", $(el).style('display'));

        $el.css({
            overflow: "hidden"
        });

        return this.animate(el, function(t, p){
            el.style.height = (1 - p) * currHeight + 'px';
            if (t === 1) {
                $el.hide().removeStyleProperty("overflow, height");
            }
        }, dur, easing, cb);
    }
});

$.fn.extend({
    fadeIn: function(dur, easing, cb){
        return this.each(function(){
            $.fadeIn(this, dur, easing, cb);
        })
    },

    fadeOut: function(dur, easing, cb){
        return this.each(function(){
            $.fadeOut(this, dur, easing, cb);
        })
    },

    slideUp: function(dur, easing, cb){
        return this.each(function(){
            $.slideUp(this, dur, easing, cb);
        })
    },

    slideDown: function(dur, easing, cb){
        return this.each(function(){
            $.slideDown(this, dur, easing, cb);
        })
    }
});