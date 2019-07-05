$.fn.extend({
    index: function(sel){
        var el, _index = -1;

        if (this.length === 0) {
            return _index;
        }

        el = not(sel) || typeof sel !== "string" ? this[0] : $(sel)[0];

        if (not(sel)) {
            el = this[0];
        } else if (sel instanceof $ && sel.length > 0) {
            el = sel[0];
        } else if (typeof sel === "string") {
            el = $(sel)[0];
        } else {
            el = undefined;
        }

        if (not(el)) {
            return _index;
        }

        $.each(el.parentNode.children, function(i){
            if (this === el) {
                _index = i;
            }
        });
        return _index;
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

        if (s === ":selected") {
            return this[0].selected;
        } else

        if (s === ":checked") {
            return this[0].checked;
        } else

        if (s === ":hidden") {
            var styles = getComputedStyle(this[0]);
            return this[0].hidden || styles['display'] === 'none' || styles['visibility'] === 'hidden' || parseInt(styles['opacity']) === 0;
        } else

        if (typeof  s === "string" && [':selected'].indexOf(s) === -1) {
            this.each(function(){
                if (matches.call(this, s)) {
                    result = true;
                }
            });
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
        return this.eq(this.length - 1);
    },

    first: function(){
        return this.eq(0);
    },

    odd: function(){
        return this.filter(function(el, i){
            return i % 2 === 0;
        });
    },

    even: function(){
        return this.filter(function(el, i){
            return i % 2 !== 0;
        });
    },

    filter: function(fn){
        if (typeof fn === "string") {
            var sel = fn;
            fn = function(el){
                return matches.call(el, sel);
            };
        }
        return $.merge($(), [].filter.call(this, fn));
    },

    find: function(s){
        var res = [], out = $();

        if (s instanceof $) return s;

        if (this.length === 0) {
            return this;
        }

        this.each(function () {
            var el = this;
            if (typeof el.querySelectorAll !== "undefined") res = res.concat([].slice.call(el.querySelectorAll(s)));
        });
        return $.merge(out, res);
    },

    children: function(s){
        var i, res = [], out = $();

        if (s instanceof $) return s;

        this.each(function(){
            var el = this;
            for(i = 0; i < el.children.length; i++) {
                if (el.children[i].nodeType === 1)
                    res.push(el.children[i]);
            }
        });
        res = s ? res.filter(function(el){
            return matches.call(el, s);
        }) : res;
        return $.merge(out, res);
    },

    parent: function(s){
        var res = [], out = $();
        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            if (this.parentNode) {
                res.push(this.parentNode);
            }
        });
        res = s ? res.filter(function(el){
            return matches.call(el, s);
        }) : res;
        return $.merge(out, res);
    },

    parents: function(s){
        var res = [], out = $();

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            var par = this.parentNode;
            while (par) {
                if (par.nodeType === 1) {
                    if (!not(s)) {
                        if (matches.call(par, s)) {
                            res.push(par);
                        }
                    } else {
                        res.push(par);
                    }
                }
                par = par.parentNode;
            }
        });

        return $.merge(out, res);
    },

    siblings: function(s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            var el = this;
            if (el.parentNode) {
                $.each(el.parentNode.children, function(){
                    if (el !== this) res.push(this)
                });
            }
        });

        if (s) {
            res = res.filter(function(el){
                return matches.call(el, s);
            })
        }

        return $.merge($(), res);
    },

    _siblingAll: function(dir, s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            var el = this;
            while (el) {
                el = el[dir];
                if (!el) break;
                res.push(el);
            }
        });

        if (s) {
            res = res.filter(function(el){
                return matches.call(el, s);
            })
        }

        return $.merge($(), res);
    },

    _sibling: function(dir, s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            var el = this[dir];
            if (el && el.nodeType === 1) {
                res.push(el);
            }
        });

        if (s) {
            res = res.filter(function(el){
                return matches.call(el, s);
            })
        }

        return $.merge($(), res);
    },

    prev: function(s){
        return this._sibling('previousElementSibling', s);
    },

    next: function(s){
        return this._sibling('nextElementSibling', s);
    },

    prevAll: function(s){
        return this._siblingAll('previousElementSibling', s);
    },

    nextAll: function(s){
        return this._siblingAll('nextElementSibling', s);
    },

    closest: function(s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        if (!s) {
            return this.parent(s);
        }

        this.each(function(){
            var el = this;
            while (el) {
                if (!el) break;
                if (matches.call(el, s)) {
                    res.push(el);
                    return ;
                }
                el = el.parentElement;
            }
        });

        return $.merge($(), res.reverse());
    },

    has: function(selector){
        var out = $();

        if (this.length === 0) {
            return ;
        }

        this.each(function(){
            var el = $(this);
            var child = el.children(selector);
            if (child.length > 0) {
                $.merge(out, el);
            }
        });

        return out;
    }

});