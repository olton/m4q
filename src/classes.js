
m4q.fn.extend({
    addClass: function(){},
    removeClass: function(){},
    toggleClass: function(){},

    containsClass: function(cls){
        return this.hasClass(cls);
    },

    hasClass: function(cls){
        var result = false;

        this.each(function(){
            if (this.classList.contains(cls)) {
                result = true;
            }
        });

        return result;
    },

    clearClasses: function(){
        return this.each(function(){
            this.className = "";
        });
    }
});

['add', 'remove', 'toggle'].forEach(function (method) {
    m4q.fn[method + "Class"] = function(cls){
        if (!cls || (""+cls).trim() === "") return this;
        return this.each(function(){
            var el = this;
            m4q.each(cls.split(" ").filter(function(v){
                return (""+v).trim() !== "";
            }), function(){
                el.classList[method](this);
            });
        });
    }
});
