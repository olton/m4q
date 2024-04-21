var _$ = window.$;

$.Promise = Promise;

window.m4q = $;

if (typeof window.$ === "undefined") {
    window.$ = $;
}

$.global = function(){
    _$ = window.$;
    window.$ = $;
};

$.noConflict = function() {
    if ( window.$ === $ ) {
        window.$ = _$;
    }

    return $;
};

