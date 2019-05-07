
var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;

m4q.extend({
    easingDef: "linear",
    easing: {
        linear: function (t) { return t },
        swing: function(t) { return 0.5 - Math.cos( t * Math.PI ) / 2; },

        easeIn: function(t){return function(t){return Math.pow(t, 3)}},
        easeOut: function(t){return function(t){return 1 - Math.abs(Math.pow(t-1, 3))}},
        easeInOut: function(t){return function(t){return t<.5 ? this.easeIn(3)(t*2)/2 :this.easeOut(3)(t*2 - 1)/2+0.5}},

        easeInQuad: function (t) { return t*t },
        easeOutQuad: function (t) { return t*(2-t) },
        easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

        easeInCubic: function (t) { return t*t*t },
        easeOutCubic: function (t) { return (--t)*t*t+1 },
        easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

        easeInQuart: function (t) { return t*t*t*t },
        easeOutQuart: function (t) { return 1-(--t)*t*t*t },
        easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

        easeInQuint: function (t) { return t*t*t*t*t },
        easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
        easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

        easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
        easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
        easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 },

        easeInSin: function (t) {return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);},
        easeOutSin : function (t) {return Math.sin(Math.PI / 2 * t);},
        easeInOutSin: function (t) {return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;}
    },

    animate: function(el, draw, dur, timing, cb){
        var $el = m4q(el), start = performance.now();
        var key, from, to, delta, unit, mapProps = {};

        dur = dur || 300;
        timing = timing || this.easingDef;

        m4q(el).origin("animation-stop", 0);

        if (isPlainObject(draw)) {
            // TODO add prop value as array [from, to]
            for (key in draw) {
                if (!Array.isArray(draw[key])) {
                    from = parseUnit($el.style(key));
                    to = parseUnit(draw[key]);
                } else {
                    from = parseUnit(draw[key][0]);
                    to = parseUnit(draw[key][1]);
                }
                unit = to[1] === '' ? 'px' : to[1];
                delta = to[0] - from[0];
                mapProps[key] = [from[0], to[0], delta, unit] ;
            }
        }

        $el.origin("animation", requestAnimationFrame(function animate(time) {
            var p, t;
            var stop = m4q(el).origin("animation-stop");

            if ( stop > 0) {
                if (stop === 2) m4q.proxy(draw, $el[0])(1);
                cancelAnimationFrame(m4q(el).origin("animation"));
                return;
            }

            t = (time - start) / dur;
            if (t > 1) t = 1;

            p = typeof timing === "string" ? m4q.easing[timing] ? m4q.easing[timing](t) : m4q.easing[m4q.easingDef](t) : timing(t);

            if (typeof draw === "function") {

                m4q.proxy(draw, $el[0])(p);

            } else if (isPlainObject(draw)) {

                (function(p){

                    for (key in mapProps) {
                        $el.css(key, mapProps[key][0] + (mapProps[key][2] * p) + mapProps[key][3]);
                    }

                })(p);

            } else {
                throw new Error("Unknown draw object. Must be a function or plain object");
            }

            if (p === 1 && typeof cb === "function") {
                m4q.proxy(cb, el);
                cb.call(el, arguments);
            }
            if (p < 1) {
                $el.origin("animation", requestAnimationFrame(animate));
            }
        }));
        return this;
    },

    stop: function(el, done){
        m4q(el).origin("animation-stop", done === true ? 2 : 1);
    }
});

m4q.fn.extend({
    animate: function (draw, dur, timing, cb) {
        return this.each(function(){
            return m4q.animate(this, draw, dur, timing, cb);
        })
    },

    stop: function(done){
        return this.each(function(){
            return m4q.stop(this, done);
        })
    }
});

