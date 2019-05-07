
m4q.each = function(ctx, cb){
    var index = 0;
    if (isArrayLike(ctx)) {
        [].forEach.call(ctx, function(el) {
            cb.apply(el, [arguments[1], arguments[0]]);
        });
    } else {
        for(var key in ctx) {
            if (ctx.hasOwnProperty(key))
                cb.apply(ctx[key], [key, ctx[key],  index++]);
        }
    }

    return ctx;
};

m4q.fn.extend({
    each: function(cb){
        return m4q.each(this, cb);
    }
});
