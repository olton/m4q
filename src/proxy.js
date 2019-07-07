$.extend({
    proxy: function(fn, context){
        return typeof fn !== "function" ? undefined : fn.bind(context);
    }
});
