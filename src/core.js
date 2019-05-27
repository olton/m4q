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
