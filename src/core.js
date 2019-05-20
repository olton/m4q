
var m4qVersion = "v@@VERSION. Built at @@TIME";
var regexpSingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

var matches = Element.prototype.matches
    || Element.prototype.matchesSelector
    || Element.prototype.webkitMatchesSelector
    || Element.prototype.mozMatchesSelector
    || Element.prototype.msMatchesSelector
    || Element.prototype.oMatchesSelector;

var m4q = function(selector, context){
    return new m4q.init(selector, context);
};

m4q.uniqueId = function () {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

m4q.toArray = function(n){
    var i, out = [];

    for (i = 0 ; i < n.length; i++ ) {
        out.push(n[i]);
    }

    return out;
};

m4q.import = function(ctx){
    var res = [], out = m4q();
    this.each(ctx, function(){
        res.push(this);
    });
    return this.merge(out, res);
};

m4q.version = m4qVersion;

m4q.fn = m4q.prototype = {
    version: m4qVersion,
    constructor: m4q,
    length: 0,
    uid: "",

    items: function(){
        return m4q.toArray(this);
    },

    // TODO add element as argument
    index: function(selector){
        var res = [];

        if (this.length === 0) {
            return -1;
        }

        m4q.each(this[0].parentNode.children, function(){
            var el = this;
            if (selector) {
                if (matches.call(el, selector)) res.push(el);
            } else {
                res.push(el);
            }
        });

        return res.indexOf(this[0]);
    },

    get: function(index){
        if (index === undefined) {
            return this.items();
        }
        return index < 0 ? this[ index + this.length ] : this[ index ];
    },

    eq: function(index){
        return m4q(this.get(index >= 0 ? index : this.length + index));
    },

    clone: function(){
        var res = [], out = m4q();
        this.each(function(){
            res.push(this.cloneNode(true));
        });
        return m4q.merge(out, res);
    },

    origin: function(name, value, def){

        if (this.length === 0) {
            return ;
        }

        if (not(name) && not(value)) {
            return m4q.data(this[0]);
        }

        if (not(value)) {
            var res = m4q.data(this[0], "origin-"+name);
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

        if (isArrayLike(s)) {
            this.each(function(){
                var el = this;
                m4q.each(s, function(){
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

    last: function(){
        return this.ind(this.length - 1);
    },

    first: function(){
        return this.ind(0);
    },

    ind: function(i){
        return this.length === 0 ? m4q() : m4q(this[i]);
    },

    odd: function(){
        return m4q.merge(m4q(), this.filter(function(el, i){
            return i % 2 === 0;
        }));
    },

    even: function(){
        return m4q.merge(m4q(), this.filter(function(el, i){
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
                m4q.each(m4q(el).find("script"), function(){
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

m4q.extend = m4q.fn.extend = function(){
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
