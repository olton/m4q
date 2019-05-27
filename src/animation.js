var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;

var Easing = {

    def: "linear",

    linear: function( t ) {
        return t;
    },

    easeInSine: function( t ) {
        return -1 * Math.cos( t * ( Math.PI / 2 ) ) + 1;
    },

    easeOutSine: function( t ) {
        return Math.sin( t * ( Math.PI / 2 ) );
    },

    easeInOutSine: function( t ) {
        return -0.5 * ( Math.cos( Math.PI * t ) - 1 );
    },

    easeInQuad: function( t ) {
        return t * t;
    },

    easeOutQuad: function( t ) {
        return t * ( 2 - t );
    },

    easeInOutQuad: function( t ) {
        return t < 0.5 ? 2 * t * t : - 1 + ( 4 - 2 * t ) * t;
    },

    easeInCubic: function( t ) {
        return t * t * t;
    },

    easeOutCubic: function( t ) {
        var t1 = t - 1;
        return t1 * t1 * t1 + 1;
    },

    easeInOutCubic: function( t ) {
        return t < 0.5 ? 4 * t * t * t : ( t - 1 ) * ( 2 * t - 2 ) * ( 2 * t - 2 ) + 1;
    },

    easeInQuart: function( t ) {
        return t * t * t * t;
    },

    easeOutQuart: function( t ) {
        var t1 = t - 1;
        return 1 - t1 * t1 * t1 * t1;
    },

    easeInOutQuart: function( t ) {
        var t1 = t - 1;
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
    },

    easeInQuint: function( t ) {
        return t * t * t * t * t;
    },

    easeOutQuint: function( t ) {
        var t1 = t - 1;
        return 1 + t1 * t1 * t1 * t1 * t1;
    },

    easeInOutQuint: function( t ) {
        var t1 = t - 1;
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1;
    },

    easeInExpo: function( t ) {
        if( t === 0 ) {
            return 0;
        }
        return Math.pow( 2, 10 * ( t - 1 ) );
    },

    easeOutExpo: function( t ) {
        if( t === 1 ) {
            return 1;
        }

        return ( -Math.pow( 2, -10 * t ) + 1 );
    },

    easeInOutExpo: function( t ) {
        if( t === 0 || t === 1 ) {
            return t;
        }

        var scaledTime = t * 2;
        var scaledTime1 = scaledTime - 1;

        if( scaledTime < 1 ) {
            return 0.5 * Math.pow( 2, 10 * ( scaledTime1 ) );
        }

        return 0.5 * ( -Math.pow( 2, -10 * scaledTime1 ) + 2 );
    },

    easeInCirc: function( t ) {
        var scaledTime = t / 1;
        return -1 * ( Math.sqrt( 1 - scaledTime * t ) - 1 );
    },

    easeOutCirc: function( t ) {
        var t1 = t - 1;
        return Math.sqrt( 1 - t1 * t1 );
    },

    easeInOutCirc: function( t ) {
        var scaledTime = t * 2;
        var scaledTime1 = scaledTime - 2;

        if( scaledTime < 1 ) {
            return -0.5 * ( Math.sqrt( 1 - scaledTime * scaledTime ) - 1 );
        }

        return 0.5 * ( Math.sqrt( 1 - scaledTime1 * scaledTime1 ) + 1 );
    },

    easeInBack: function(t, m) {
        m = m || 1.70158;
        return t * t * ( ( m + 1 ) * t - m );
    },

    easeOutBack: function(t, m) {
        m = m || 1.70158;
        var scaledTime = ( t / 1 ) - 1;

        return (
            scaledTime * scaledTime * ( ( m + 1 ) * scaledTime + m )
        ) + 1;
    },

    easeInOutBack: function( t, m ) {
        m = m || 1.70158;
        var scaledTime = t * 2;
        var scaledTime2 = scaledTime - 2;
        var s = m * 1.525;

        if( scaledTime < 1) {
            return 0.5 * scaledTime * scaledTime * (
                ( ( s + 1 ) * scaledTime ) - s
            );
        }

        return 0.5 * (
            scaledTime2 * scaledTime2 * ( ( s + 1 ) * scaledTime2 + s ) + 2
        );
    },

    easeInElastic: function( t, m ) {
        m  = m || 0.7;
        if( t === 0 || t === 1 ) {
            return t;
        }

        var scaledTime = t / 1;
        var scaledTime1 = scaledTime - 1;

        var p = 1 - m;
        var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

        return -(
            Math.pow( 2, 10 * scaledTime1 ) *
            Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
        );
    },

    easeOutElastic: function( t, m ) {
        m = m || 0.7;
        var p = 1 - m;
        var scaledTime = t * 2;

        if( t === 0 || t === 1 ) {
            return t;
        }

        var s = p / ( 2 * Math.PI ) * Math.asin( 1 );
        return (
            Math.pow( 2, -10 * scaledTime ) *
            Math.sin( ( scaledTime - s ) * ( 2 * Math.PI ) / p )
        ) + 1;

    },

    easeInOutElastic: function( t, m ) {
        m = m || 0.65;
        var p = 1 - m;

        if( t === 0 || t === 1 ) {
            return t;
        }

        var scaledTime = t * 2;
        var scaledTime1 = scaledTime - 1;

        var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

        if( scaledTime < 1 ) {
            return -0.5 * (
                Math.pow( 2, 10 * scaledTime1 ) *
                Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
            );
        }

        return (
            Math.pow( 2, -10 * scaledTime1 ) *
            Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p ) * 0.5
        ) + 1;

    },

    easeOutBounce: function( t ) {
        var scaledTime2, scaledTime = t / 1;

        if( scaledTime < ( 1 / 2.75 ) ) {

            return 7.5625 * scaledTime * scaledTime;

        } else if( scaledTime < ( 2 / 2.75 ) ) {

            scaledTime2 = scaledTime - ( 1.5 / 2.75 );
            return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.75;

        } else if( scaledTime < ( 2.5 / 2.75 ) ) {

            scaledTime2 = scaledTime - ( 2.25 / 2.75 );
            return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.9375;

        } else {

            scaledTime2 = scaledTime - ( 2.625 / 2.75 );
            return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.984375;

        }
    },

    easeInBounce: function( t ) {
        return 1 - Easing.easeOutBounce( 1 - t );
    },

    easeInOutBounce: function( t ) {
        if( t < 0.5 ) {
            return Easing.easeInBounce( t * 2 ) * 0.5;
        }
        return ( Easing.easeOutBounce( ( t * 2 ) - 1 ) * 0.5 ) + 0.5;
    }
};

$.easing = {};

$.extend($.easing, Easing);

$.extend({
    animate: function(el, draw, dur, timing, cb){
        var $el = $(el), start = performance.now();
        var key, from, to, delta, unit, mapProps = {};

        if (dur === 0 || $.fx.off) {
            dur = 1;
        }

        dur = dur || 300;
        timing = timing || this.easing.def;

        $(el).origin("animation-stop", 0);

        if (isPlainObject(draw)) {
            // TODO add prop value as array [from, to]
            for (key in draw) {
                if (draw.hasOwnProperty(key)) {
                    if (!Array.isArray(draw[key])) {
                        from = parseUnit($el.style(key));
                        to = parseUnit(draw[key]);
                    } else {
                        from = parseUnit(draw[key][0]);
                        to = parseUnit(draw[key][1]);
                    }
                    unit = to[1] === '' ? 'px' : to[1];
                    delta = to[0] - from[0];
                    mapProps[key] = [from[0], to[0], delta, unit];
                }
            }
        }

        $el.origin("animation", requestAnimationFrame(function animate(time) {
            var p, t;
            var stop = $(el).origin("animation-stop");

            if ( stop > 0) {
                if (stop === 2) $.proxy(draw, $el[0])(1);
                cancelAnimationFrame($(el).origin("animation"));
                return;
            }

            t = (time - start) / dur;

            if (t > 1) t = 1;
            if (t < 0) t = 0;

            var fn = typeof timing === "string" ? $.easing[timing] ? $.easing[timing] : $.easing[$.easing.def] : timing;

            p = fn(t);

            if (typeof draw === "function") {

                $.proxy(draw, $el[0])(t, p);

            } else if (isPlainObject(draw)) {

                (function(t, p){

                    for (key in mapProps) {
                        if (mapProps.hasOwnProperty(key))
                            $el.css(key, mapProps[key][0] + (mapProps[key][2] * p) + mapProps[key][3]);
                    }

                })(t, p);

            } else {
                throw new Error("Unknown draw object. Must be a function or plain object");
            }

            if (t === 1 && typeof cb === "function") {
                $.proxy(cb, el);
                cb.call(el, arguments);
            }
            if (t < 1) {
                $el.origin("animation", requestAnimationFrame(animate));
            }
        }));
        return this;
    },

    stop: function(el, done){
        $(el).origin("animation-stop", done === true ? 2 : 1);
    }
});

$.fn.extend({
    animate: function (draw, dur, timing, cb) {
        return this.each(function(){
            return $.animate(this, draw, dur, timing, cb);
        })
    },

    stop: function(done){
        return this.each(function(){
            return $.stop(this, done);
        })
    }
});

