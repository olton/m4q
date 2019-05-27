$.fn.extend({
    // TODO add element as argument
    index: function(sel){
        var res = [];

        if (this.length === 0) {
            return -1;
        }

        $.each(this[0].parentNode.children, function(){
            var el = this;
            if (sel) {
                if (matches.call(el, sel)) res.push(el);
            } else {
                res.push(el);
            }
        });

        return res.indexOf(this[0]);
    },

    get: function(i){
        if (i === undefined) {
            return this.items();
        }
        return i < 0 ? this[ i + this.length ] : this[ i ];
    },

    eq: function(i){
        return $(this.get(i >= 0 ? i : this.length + i));
    },

    clone: function(){
        var res = [], out = $();
        this.each(function(){
            res.push(this.cloneNode(true));
        });
        return $.merge(out, res);
    },

    contains: function(s){
        return this.find(s).length > 0;
    },

    is: function(s){
        var result = false;

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) {
            return this.same(s);
        }

        if (typeof  s === "string" && [':selected'].indexOf(s) === -1) {
            this.each(function(){
                if (matches.call(this, s)) {
                    result = true;
                }
            });
        } else

        if (s === ":selected") {
            return this[0].selected;
        } else

        if (s === ":checked") {
            return this[0].checked;
        } else

        if (s === ":hidden") {
            return this[0].hidden;
        } else

        if (isArrayLike(s)) {
            this.each(function(){
                var el = this;
                $.each(s, function(){
                    var sel = this;
                    if (el === sel) {
                        result = true;
                    }
                })
            });
        } else

        if (typeof s === "object" && s.nodeType === 1) {
            this.each(function(){
                if  (this === s) {
                    result = true;
                }
            })
        }

        return result;
    },

    same: function(o){
        var result = true;
        if (!o instanceof $ || this.length !== o.length) return false;
        this.each(function(){
            if (o.items().indexOf(this) === -1) {
                result = false;
            }
        });
        return result;
    },

    last: function(){
        return this.ind(this.length - 1);
    },

    first: function(){
        return this.ind(0);
    },

    ind: function(i){
        if (this.length === 0) return $();
        if (not(i)) return ;
        if (i  > this.length) i = this.length - 1;
        return i < 0 ?  $(this[i + this.length]) : $(this[i]);
    },

    odd: function(){
        return $.merge($(), this.filter(function(el, i){
            return i % 2 === 0;
        }));
    },

    even: function(){
        return $.merge($(), this.filter(function(el, i){
            return i % 2 !== 0;
        }));
    }
});