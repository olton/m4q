
m4q.fn.extend({
    filter: function(fn){
        return [].filter.call(this, fn);
    },

    find: function(s){
        var res = [], out = m4q();

        if (s instanceof m4q) return s;

        if (this.length === 0) {
            return this;
        }

        this.each(function (el) {
            if (typeof el.querySelectorAll !== "undefined") res = [].slice.call(el.querySelectorAll(s));
        });
        return m4q.merge(out, res);
    },

    children: function(s){
        var i, res = [], out = m4q();

        if (s instanceof m4q) return s;

        this.each(function(el){
            for(i = 0; i < el.children.length; i++) {
                if (el.children[i].nodeType === 1)
                    res.push(el.children[i]);
            }
        });
        res = s ? res.filter(function(el){
            return matches.call(el, s);
        }) : res;
        return m4q.merge(out, res);
    },

    parent: function(s){
        var res = [], out = m4q();
        if (this.length === 0) {
            return ;
        }

        if (s instanceof m4q) return s;

        this.each(function(el){
            if (el.parentNode) {
                res.push(el.parentNode);
            }
        });
        res = s ? res.filter(function(el){
            return matches.call(el, s);
        }) : res;
        return m4q.merge(out, res);
    },

    parents: function(s){
        var res = [], out = m4q();

        if (this.length === 0) {
            return ;
        }

        if (s instanceof m4q) return s;

        this.each(function(el){
            var par = el.parentNode;
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

        return m4q.merge(out, res);
    },

    siblings: function(s){
        var res = [], out = m4q();

        if (this.length === 0) {
            return ;
        }

        if (s instanceof m4q) return s;

        this.each(function(el){
            var elems = [].filter.call(el.parentNode.children, function(child){
                return child !== el && (s ? matches.call(child, s) : true);
            });

            elems.forEach(function(el){
                res.push(el);
            })
        });

        return m4q.merge(out, res);
    },

    _siblingAll: function(dir, s){
        var out = m4q();

        if (this.length === 0) {
            return ;
        }

        if (s instanceof m4q) return s;

        this.each(function(el){
            while (el) {
                el = el[dir];
                if (!el) break;
                if (!s) {
                    m4q.merge(out, m4q(el));
                } else {
                    if (matches.call(el, s)) {
                        m4q.merge(out, m4q(el));
                    }
                }
            }
        });

        return out;
    },

    _sibling: function(dir, s){
        var out = m4q();

        if (this.length === 0) {
            return ;
        }

        if (s instanceof m4q) return s;

        out = m4q();

        this.each(function(el){
            var sib = el[dir];
            if (sib && sib.nodeType === 1) {
                if (not(s)) {
                    m4q.merge(out, m4q(sib));
                } else {
                    if (matches.call(sib, s)) {
                        m4q.merge(out, m4q(sib));
                    }
                }
            }
        });

        return out;
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
        var out = m4q();

        if (this.length === 0) {
            return ;
        }

        if (s instanceof m4q) return s;

        if (!s) {
            return this.parent(s);
        }

        this.each(function(el){
            while (el) {
                el = el.parentElement;
                if (!el) break;
                if (matches.call(el, s)) {
                    m4q.merge(out, m4q(el));
                    return ;
                }
            }
        });

        return out;
    },

    has: function(selector){
        var out = m4q();

        if (this.length === 0) {
            return ;
        }

        this.each(function(el){
            var $el = m4q(el);
            var child = $el.children(selector);
            if (child.length > 0) {
                m4q.merge(out, $el);
            }
        });

        return out;
    }
});