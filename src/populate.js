var _$ = global.$,
    _m4q = global.m4q;

$.Promise = Promise;

global.m4q = $;

if (typeof global.$ === "undefined") {
    global.$ = $;
}

m4q.global = function(){
    _$ = global.$;
    _m4q = global.m4q;
    global.$ = $;
};

m4q.noConflict = function(deep) {
    if ( global.$ === $ ) {
        global.$ = _$;
    }

    if (deep && global.m4q === $) {
        global.m4q = _m4q;
    }

    return $;
};
