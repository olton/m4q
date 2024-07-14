$.extend({
    bind: function(fn, ctx){
        return this.proxy(fn, ctx);
    }
});
