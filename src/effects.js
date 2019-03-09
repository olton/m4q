
m4q.extend({
    hide: function(el, cb){
        var $el = m4q(el);
        if (!!el.style.display) {
            $el.origin('display', (el.style.display ? el.style.display : getComputedStyle(el, null)['display']));
        }
        el.style.display = 'none';
        if (typeof cb === "function") {
            m4q.proxy(cb, el);
            cb.call(el, arguments);
        }
        return this;
    },

    show: function(el, cb){
        var display = m4q(el).origin('display', undefined, "block");
        el.style.display = display ? display === 'none' ? 'block' : display : '';
        if (parseInt(el.style.opacity) === 0) {
            el.style.opacity = "1";
        }
        if (typeof cb === "function") {
            m4q.proxy(cb, el);
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
            m4q.proxy(cb, el);
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
        return m4q[func](el, cb);
    },

    fadeIn: function(el, dur, easing, cb){
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

        var originDisplay = m4q(el).origin("display", undefined, 'block');
        var originOpacity = m4q(el).origin("opacity", undefined, 1);

        el.style.opacity = 0;
        el.style.display = originDisplay;

        return this.animate(el, function(p){
            el.style.opacity = originOpacity * p;
            if (p === 1) {
                el.style.display = originDisplay;
            }
        }, dur, easing, cb);
    },

    fadeOut: function(el, dur, easing, cb){
        var $el = m4q(el), opacity;

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

        opacity = m4q(el).style('opacity');

        $el.origin("display", m4q(el).style('display'));
        $el.origin("opacity", opacity);

        return this.animate(el, function(p){
            el.style.opacity = (1 - p) * opacity;
            if (p === 1) {
                el.style.display = 'none';
            }
        }, dur, easing, cb);
    },

    slideDown: function(el, dur, easing, cb) {
        var $el = m4q(el);
        var targetHeight, originDisplay;

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
        originDisplay = $el.origin("display", m4q(el).style('display'), "block");
        $el.height(0).visible(true);

        $el.css({
            overflow: "hidden",
            display: originDisplay === "none" ? "block" : originDisplay
        });

        return this.animate(el, function(p){
            el.style.height = (targetHeight * p) + "px";
            if (p === 1) {
                $el.css({
                    overflow: "",
                    height: "",
                    visibility: ""
                })
            }
        }, dur, easing, cb);
    },

    slideUp: function(el, dur, easing, cb) {
        var $el = m4q(el);
        var currHeight;

        if ($el.height() === 0) {
            return ;
        }

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
        $el.origin("display", m4q(el).style('display'));

        $el.css({
            overflow: "hidden"
        });

        return this.animate(el, function(p){
            el.style.height = (1 - p) * currHeight + 'px';
            if (p === 1) {
                $el.hide().css({
                    overflow: "",
                    height: ""
                });
            }
        }, dur, easing, cb);
    }
});

m4q.fn.extend({
    hide: function(cb){
        return this.each(function(el){
            m4q.hide(el, cb);
        });
    },

    show: function(cb){
        return this.each(function(el){
            m4q.show(el, cb);
        });
    },

    visible: function(mode, cb){
        return this.each(function(el){
            m4q.visible(el, mode, cb);
        });
    },

    toggle: function(cb){
        return this.each(function(el){
            m4q.toggle(el, cb);
        })
    },

    fadeIn: function(dur, easing, cb){
        return this.each(function(el){
            m4q.fadeIn(el, dur, easing, cb);
        })
    },

    fadeOut: function(dur, easing, cb){
        return this.each(function(el){
            m4q.fadeOut(el, dur, easing, cb);
        })
    },

    slideUp: function(dur, easing, cb){
        return this.each(function(el){
            m4q.slideUp(el, dur, easing, cb);
        })
    },

    slideDown: function(dur, easing, cb){
        return this.each(function(el){
            m4q.slideDown(el, dur, easing, cb);
        })
    }
});

