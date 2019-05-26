var m4qVersion = "v@@VERSION. Built at @@TIME";
var regexpSingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

var matches = Element.prototype.matches
    || Element.prototype.matchesSelector
    || Element.prototype.webkitMatchesSelector
    || Element.prototype.mozMatchesSelector
    || Element.prototype.msMatchesSelector
    || Element.prototype.oMatchesSelector;

var $ = function(selector, context){
    return new $.init(selector, context);
};

$.uniqueId = function () {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

$.toArray = function(n){
    var i, out = [];

    for (i = 0 ; i < n.length; i++ ) {
        out.push(n[i]);
    }

    return out;
};

$.import = function(ctx){
    var res = [], out = $();
    this.each(ctx, function(){
        res.push(this);
    });
    return this.merge(out, res);
};

$.version = m4qVersion;

$.fn = $.prototype = {
    version: m4qVersion,
    constructor: $,
    length: 0,
    uid: "",

    items: function(){
        return $.toArray(this);
    },

    // TODO add element as argument
    index: function(selector){
        var res = [];

        if (this.length === 0) {
            return -1;
        }

        $.each(this[0].parentNode.children, function(){
            var el = this;
            if (selector) {
                if (matches.call(el, selector)) res.push(el);
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

    origin: function(name, value, def){

        if (this.length === 0) {
            return ;
        }

        if (not(name) && not(value)) {
            return $.data(this[0]);
        }

        if (not(value)) {
            var res = $.data(this[0], "origin-"+name);
            return !not(res) ? res : def;
        }

        this.data("origin-"+name, value);

        return this;
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
    },

    _prop: function(prop, value){
        if (this.length === 0) {
            return ;
        }

        if (arguments.length === 1) {
            return this[0][prop];
        }

        if (not(value)) {
            value = '';
        }

        this.each(function(){
            var el = this;

            el[prop] = value;

            if (prop === "innerHTML") {
                $.each($(el).find("script"), function(){
                    var script = this;
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    if (script.src) {
                        s.src = script.src;
                    } else {
                        s.textContent = script.innerText;
                    }
                    document.body.appendChild(s);
                    script.parentNode.removeChild(script);
                });
            }
        });

        return this;
    },

    val: function(value){
        return arguments.length === 0 ? this._prop('value') : this._prop('value', typeof value === "undefined" ? "" : value);
    },

    prop: function(prop, value){
        return arguments.length === 0 ? this._prop(prop) : this._prop(prop, typeof value === "undefined" ? "" : value);
    },

    id: function(){
        if (this.length === 0) {
            return ;
        }
        return this[0].getAttribute("id");
    },

    push: [].push,
    sort: [].sort,
    splice: [].splice,
    indexOf: [].indexOf
};

$.extend = $.fn.extend = function(){
    var options, name,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length;

    if ( typeof target !== "object" && typeof target !== "function" ) {
        target = {};
    }

    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {
        if ( ( options = arguments[ i ] ) != null ) {
            for ( name in options ) {
                if (options.hasOwnProperty(name)) target[ name ] = options[ name ];
            }
        }
    }

    return target;
};
