
m4q.each = function(ctx, cb){
    var index = 0;
    if (isArrayLike(ctx)) {
        [].forEach.call(ctx, function(el) {
            cb.apply(el, arguments);
        });
    } else {
        for(var key in ctx) {
            if (ctx.hasOwnProperty(key))
                cb.apply(ctx[key], [ctx[key], key,  index++]);
        }
    }

    return ctx;
};

m4q.fn.extend({
    each: function(cb){
        [].forEach.call(this, function(el) {
            cb.apply(el, arguments);
        });

        return this;
    }
});
