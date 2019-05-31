$.extend({

    fx: {
        off: false,
        hideOnFadeOut: true
    },

    hide: function(el, cb){
        var $el = $(el);
        if (!!el.style.display) {
            $el.origin('display', (el.style.display ? el.style.display : getComputedStyle(el, null)['display']));
        }
        el.style.display = 'none';
        if (typeof cb === "function") {
            $.proxy(cb, el);
            cb.call(el, arguments);
        }
        return this;
    },

    show: function(el, cb){
        var display = $(el).origin('display', undefined, "block");
        el.style.display = display ? display === 'none' ? 'block' : display : '';
        if (parseInt(el.style.opacity) === 0) {
            el.style.opacity = "1";
        }
        if (typeof cb === "function") {
            $.proxy(cb, el);
            cb.call(el, arguments);
        }
        return this;
    },

    visible: function(el, mode, cb){
        if (mode === undefined) {
            mode = true;
        }
        el.style.visibility = mode ? 'visible' : 'hidden';
        if (typeof cb === "function") {
            $.proxy(cb, el);
            cb.call(el, arguments);
        }
        return this;
    },

    toggle: function(el, cb){
        var func;
        if ( getComputedStyle(el, null)['display'] !== 'none') {
            func = 'hide';
        } else {
            func = 'show';
        }
        return $[func](el, cb);
    },

    fadeIn: function(el, dur, easing, cb){
        var $el = $(el), opacity;

        if ($el.origin("fadeout") === false || $el.origin("fadeout") === undefined) return ;

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
        var originOpacity = $(el).origin("opacity", undefined, 1);

        el.style.opacity = 0;
        el.style.display = originDisplay;

        return this.animate(el, function(t, p){
            el.style.opacity = originOpacity * p;
            if (t === 1) {
                el.style.display = originDisplay;
                $el.origin("fadeout", false);
            }
        }, dur, easing, cb);
    },

    fadeOut: function(el, dur, easing, cb){
        var $el = $(el), opacity;

        if ($el.origin("fadeout") === true) return ;

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

        opacity = $(el).style('opacity');

        $el.origin("display", $(el).style('display'));
        $el.origin("opacity", opacity);

        return this.animate(el, function(t, p){
            el.style.opacity = (1 - p) * opacity;
            if (t === 1) {
                if ($.fx.hideOnFadeOut) el.style.display = 'none';
                $el.origin("fadeout", true);
            }
        }, dur, easing, cb);
    },

    slideDown: function(el, dur, easing, cb) {
        var $el = $(el);
        var targetHeight, originDisplay;

        if ($el.origin("slidedown") === true) return ;

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
                $el.css({
                    overflow: "",
                    height: "",
                    visibility: ""
                });
                $el.origin("slidedown", true);
            }
        }, dur, easing, cb);
    },

    slideUp: function(el, dur, easing, cb) {
        var $el = $(el);
        var currHeight;

        if ($el.origin("slidedown") === false || $el.origin("slidedown") === undefined) return ;

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
                $el.hide().css({
                    overflow: "",
                    height: ""
                });
                $el.origin("slidedown", false);
            }
        }, dur, easing, cb);
    }
});

$.fn.extend({
    hide: function(cb){
        var callback = undefined;

        $.each(arguments, function(){
            if (typeof this === 'function') {
                callback = this;
            }
        });

        return this.each(function(){
            $.hide(this, callback);
        });
    },

    show: function(cb){
        var callback = undefined;

        $.each(arguments, function(){
            if (typeof this === 'function') {
                callback = this;
            }
        });

        return this.each(function(){
            $.show(this, callback);
        });
    },

    visible: function(mode, cb){
        return this.each(function(){
            $.visible(this, mode, cb);
        });
    },

    toggle: function(cb){
        if (typeof cb !== 'function') {
            cb = null;
        }
        return this.each(function(){
            $.toggle(this, cb);
        })
    },

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

