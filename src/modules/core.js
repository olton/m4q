var matches = Element.prototype.matches
    || Element.prototype.matchesSelector
    || Element.prototype.webkitMatchesSelector
    || Element.prototype.mozMatchesSelector
    || Element.prototype.msMatchesSelector
    || Element.prototype.oMatchesSelector;

var $ = function(selector, context){
    return new $.init(selector, context);
};

$.version = "@@VERSION";
$.build_time = "@@BUILD_TIME";
$.info = () => console.info(`%c M4Q %c v${$.version} %c ${$.build_time} `, "color: white; font-weight: bold; background: #fd6a02", "color: white; background: darkgreen", "color: white; background: #0080fe;")

$.fn = $.prototype = {
    [Symbol.isConcatSpreadable]: true,
    constructor: $,
    length: 0,
    uid: "",

    push: [].push,
    sort: [].sort,
    splice: [].splice,
    slice: [].slice,
    reverse: [].reverse,
    map: [].map,
    pop: [].pop,
    shift: [].shift,
    unshift: [].unshift,
    concat: [].concat,
    includes: [].includes,
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
                if (hasProp(options, name))
                    target[ name ] = options[ name ];
            }
        }
    }

    return target;
};

$.assign = function(){
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
                if (hasProp(options, name) && options[name] !== undefined)
                    target[ name ] = options[ name ];
            }
        }
    }

    return target;
};