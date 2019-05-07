
m4q.fn.extend({
    _size: function(prop, val){
        if (this.length === 0) {
            return ;
        }

        if (val === undefined) {

            var el = this[0];

            if (prop === 'height') {
                return el === window ? window.innerHeight : el === document ? el.body.clientHeight : el.clientHeight;
            }
            if (prop === 'width') {
                return el === window ? window.innerWidth : el === document ? el.body.clientWidth : el.clientWidth;
            }
        }

        return this.each(function(){
            var el = this;
            if (el === window || el === document) {return ;}
            el.style[prop] = isNaN(val) ? val : val + 'px';
        });
    },

    height: function(val){
        return this._size.call(this, 'height', val);
    },

    width: function(val){
        return this._size.call(this, 'width', val);
    },

    _sizeOut: function(prop, val){
        var el, size, style, result;

        if (this.length === 0) {
            return ;
        }

        if (val !== undefined && typeof val !== "boolean") {
            return this.each(function(){
                var el = this;
                if (el === window || el === document) {return ;}
                var style = getComputedStyle(el, null),
                    bs = prop === 'width' ? parseInt(style['border-left-width']) + parseInt(style['border-right-width']) : parseInt(style['border-top-width']) + parseInt(style['border-bottom-width']),
                    pa = prop === 'width' ? parseInt(style['padding-left']) + parseInt(style['padding-right']) : parseInt(style['padding-top']) + parseInt(style['padding-bottom']);

                val = parseInt(val);
                el.style[prop] = val + bs + pa + 'px';
            });
        }

        el = this[0];
        size = el[prop === 'width' ? 'offsetWidth' : 'offsetHeight'];
        style = getComputedStyle(el);
        result = size + parseInt(style[prop === 'width' ? 'margin-left' : 'margin-top']) + parseInt(style[prop === 'width' ? 'margin-right' : 'margin-bottom']);
        return val === true ? result : size;
    },

    outerWidth: function(val){
        return this._sizeOut.call(this, 'width', val);
    },

    outerHeight: function(val){
        return this._sizeOut.call(this, 'height', val);
    }
});