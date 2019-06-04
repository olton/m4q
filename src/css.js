//var nonDigit = /[^0-9.\-]/;
var numProps = ['opacity', 'zIndex'];

$.fn.extend({
    style: function(name){
        if (this.length === 0) {
            return this;
        }
        var el = this[0];
        if (not(name)) {
            return el.style ? el.style : getComputedStyle(el, null);
        } else {
            // Rewrite for array
            // return ["scrollLeft", "scrollTop"].indexOf(name) > -1 ? $(el)[name]() : el.style[name] ? el.style[name] : getComputedStyle(el, null)[name];
            var result = {}, names = name.split(", ").map(function(el){
                return (""+el).trim();
            });
            if (names.length === 1)  {
                return ["scrollLeft", "scrollTop"].indexOf(names[0]) > -1 ? $(el)[names[0]]() : el.style[names[0]] ? el.style[names[0]] : getComputedStyle(el, null)[names[0]];
            } else {
                $.each(names, function () {
                    result[this] = ["scrollLeft", "scrollTop"].indexOf(this) > -1 ? $(el)[this]() : el.style[this] ? el.style[this] : getComputedStyle(el, null)[this];
                });
                return result;
            }
        }
    },

    removeStyleProperty: function(name){
        var that = this;
        if (not(name) || this.length === 0) return ;
        var names = name.split(", ").map(function(el){
            return (""+el).trim();
        });
        $.each(names, function(){
            var prop = this;
            that.each(function(){
                var el = this;
                el.style.removeProperty(prop);
            })
        });
    },

    css: function(o, v){
        if (this.length === 0) {
            return this;
        }

        if (not(o) || (typeof o === "string" && not(v))) {
            return  this.style(o);
        }

        return this.each(function(){
            var el = this;
            if (typeof o === "object") {
                for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                        if (["scrollLeft", "scrollTop"].indexOf(key) > -1) {
                            $(el)[name](parseInt(o[key]));
                        } else {
                            el.style[camelCase(key)] = isNaN(o[key]) || numProps.indexOf(key) > -1 ? o[key] : o[key] + 'px';
                        }
                    }
                }
            } else if (typeof o === "string") {
                o = camelCase(o);
                if (["scrollLeft", "scrollTop"].indexOf(o) > -1) {
                    $(el)[o](parseInt(v));
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

