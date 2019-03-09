var _$ = window.$,
    _m4q = window.m4q,
    _$M = window.$M;

m4q.Promise = Promise;

window.m4q = m4q;

if (typeof window.$ === "undefined") {
    window.$ = m4q;
}

if (typeof window.$M === "undefined") {
    window.$M = m4q;
}

m4q.global = function(){
    window.$M = window.$ = m4q;
};

m4q.noConflict = function(deep) {
    if ( window.$ === m4q ) {
        window.$ = _$;
    }
    if ( window.$M === m4q ) {
        window.$M = _$M;
    }

    if (deep && window.m4q === m4q) {
        window.m4q = _m4q;
    }

    return m4q;
};
