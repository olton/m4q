$.extend({
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
    }
});

