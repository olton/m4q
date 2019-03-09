

//var nonDigit = /[^0-9.\-]/;
var numProps = ['opacity'];

m4q.fn.extend({
    style: function(name){
        if (this.length === 0) {
            return ;
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
            return ;
        }

        var el = this[0];

        if (typeof o === "string" && v === undefined) {
            return  el.style[o] ? el.style[o] : getComputedStyle(el, null)[o];
        }

        this.each(function(el){
            if (typeof o === "object") {
                for (var key in o) {
                    if (["scrollLeft", "scrollTop"].indexOf(key) > -1) {
                        m4q(el)[name](parseInt(o[key]));
                    } else {
                        el.style[key] = o[key] === "" ? o[key] : isNaN(o[key]) || numProps.indexOf(key) > -1 ? o[key] : o[key] + 'px';
                    }
                }
            } else if (typeof o === "string") {
                if (["scrollLeft", "scrollTop"].indexOf(o) > -1) {
                    m4q(el)[o](parseInt(v));
                } else {
                    el.style[o] = v === "" ? v : isNaN(v) || numProps.indexOf(o) > -1 ? v : v + 'px';
                }
            }
        });

        return this;
    },

    scrollTop: function(val){
        if (not(val)) {
            return this.length === 0 ? undefined : this[0] === window ? pageYOffset : this[0].scrollTop;
        }
        return this.each(function(el){
            el.scrollTop = val;
        })
    },

    scrollLeft: function(val){
        if (not(val)) {
            return this.length === 0 ? undefined : this[0] === window ? pageXOffset : this[0].scrollLeft;
        }
        return this.each(function(el){
            el.scrollLeft = val;
        })
    }
});

