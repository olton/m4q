var _$ = window.$,
    _m4q = window.m4q;

$.Promise = Promise;

window.m4q = $;

if (typeof window.$ === "undefined") {
    window.$ = $;
}

m4q.global = function(){
    _$ = window.$;
    _m4q = window.m4q;
    window.$ = $;
};

m4q.noConflict = function(deep) {
    if ( window.$ === $ ) {
        window.$ = _$;
    }

    if (deep && window.m4q === $) {
        window.m4q = _m4q;
    }

    return $;
};
