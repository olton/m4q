
m4q.extend({
    proxy: function(fn, context){
        if (typeof fn !== "function") {
            return ;
        }
        if (context === undefined || context === null) {
            context = this;
        }
        return fn.bind(context);
    }
});
