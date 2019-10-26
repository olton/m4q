var m4qVersion = "v@@VERSION. Built at @@TIME";
var regexpSingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

var matches = Element.prototype.matches
    || Element.prototype["matchesSelector"]
    || Element.prototype["webkitMatchesSelector"]
    || Element.prototype["mozMatchesSelector"]
    || Element.prototype["msMatchesSelector"]
    || Element.prototype["oMatchesSelector"];

var $ = function(selector, context){
    return new $.init(selector, context);
};

$.version = m4qVersion;

$.fn = $.prototype = {
    version: m4qVersion,
    constructor: $,
    length: 0,
    uid: "",

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

if (typeof window["hideM4QVersion"] === "undefined") console.log("m4q "+$.version);