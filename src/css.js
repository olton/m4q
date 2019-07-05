var numProps = ['opacity', 'zIndex'];

$.fn.extend({

    _getStyle: function(el, prop, pseudo){
        return ["scrollLeft", "scrollTop"].indexOf(prop) > -1 ? $(el)[prop]() : getComputedStyle(el, pseudo)[prop];
    },

    style: function(name, pseudo){
        var that = this, el;

        if (typeof name === 'string' && this.length === 0) {
            return undefined;
        }

        if (this.length === 0) {
            return this;
        }

        el = this[0];

        if (not(name) || name === "all") {
            return getComputedStyle(el, pseudo);
        } else {
            var result = {}, names = name.split(", ").map(function(el){
                return (""+el).trim();
            });
            if (names.length === 1)  {
                return this._getStyle(el, names[0], pseudo);
            } else {
                $.each(names, function () {
                    var prop = this;
                    result[this] = that._getStyle(el, prop, pseudo);
                });
                return result;
            }
        }
    },

    removeStyleProperty: function(name){
        if (not(name) || this.length === 0) return this;
        var names = name.split(", ").map(function(el){
            return (""+el).trim();
        });

        return this.each(function(){
            var el = this;
            $.each(names, function(){
                el.style.removeProperty(this);
            });
        });
    },

    css: function(o, v){

        o = o || 'all';

        if (typeof o === "string" && not(v)) {
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

