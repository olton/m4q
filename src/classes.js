
m4q.fn.extend({
    addClass: function(){},
    removeClass: function(){},
    toggleClass: function(){},

    containsClass: function(cls){
        return this.hasClass(cls);
    },

    hasClass: function(cls){
        var result = false;

        this.each(function(el){
            if (el.classList.contains(cls)) {
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
        return this.each(function(el){
            m4q.each(cls.split(" ").filter(function(v){
                return (""+v).trim() !== "";
            }), function(name){
                el.classList[method](name);
            });
        });
    }
});
