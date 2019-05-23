

//var nonDigit = /[^0-9.\-]/;
var numProps = ['opacity', 'zIndex'];

m4q.fn.extend({
    style: function(name){
        if (this.length === 0) {
            return this;
        }
        var el = this[0];
        if (arguments.length === 0 || name === undefined) {
            return el.style ? el.style : getComputedStyle(el, null);
        } else {
            return ["scrollLeft", "scrollTop"].indexOf(name) > -1 ? m4q(el)[name]() : el.style[name] ? el.style[name] : getComputedStyle(el, null)[name];
        }
    },

    css: function(o, v){
        if (this.length === 0) {
            return this;
        }

        var el = this[0];

        if (typeof o === "string" && v === undefined) {
            return  el.style[o] ? el.style[o] : getComputedStyle(el, null)[o];
        }

        return this.each(function(){
            var el = this;
            if (typeof o === "object") {
                for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                        if (["scrollLeft", "scrollTop"].indexOf(key) > -1) {
                            m4q(el)[name](parseInt(o[key]));
                        } else {
                            el.style[camelCase(key)] = isNaN(o[key]) || numProps.indexOf(key) > -1 ? o[key] : o[key] + 'px';
                        }
                    }
                }
            } else if (typeof o === "string") {
                o = camelCase(o);
                if (["scrollLeft", "scrollTop"].indexOf(o) > -1) {
                    m4q(el)[o](parseInt(v));
                } else {
                    el.style[o] = isNaN(v) || numProps.indexOf(o) > -1 ? v : v + 'px';
                }
            }
        });
    },

    scrollTop: function(val){
        if (not(val)) {
            return this.length === 0 ? undefined : this[0] === window ? pageYOffset : this[0].scrollTop;
        }
        return this.each(function(){
            this.scrollTop = val;
        })
    },

    scrollLeft: function(val){
        if (not(val)) {
            return this.length === 0 ? undefined : this[0] === window ? pageXOffset : this[0].scrollLeft;
        }
        return this.each(function(){
            this.scrollLeft = val;
        })
    }
});

