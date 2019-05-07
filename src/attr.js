
m4q.fn.extend({
    attr: function(name, val){
        var attributes = {};

        if (this.length === 0) {
            return this;
        }

        if (arguments.length === 0) {
            m4q.each(this[0].attributes, function(){
                attributes[this.nodeName] = this.nodeValue;
            });
            return attributes;
        }

        if (not(name)) {
            return name;
        }

        if (name && !isPlainObject(name) && val === undefined) {
            return this[0].nodeType === 1 && this[0].hasAttribute(name) ? this[0].getAttribute(name) : undefined;
        }

        if (isPlainObject(name)) {
            this.each(function(){
                for (var key in name) {
                    if (name.hasOwnProperty(key))
                        this.setAttribute(key, name[key]);
                }
            });
        } else {
            this.each(function(){
                this.setAttribute(name, val);
            });
        }

        return this;
    },

    removeAttr: function(name){
        return this.each(function(){
            if (this.hasAttribute(name)) this.removeAttribute(name);
        });
    },

    toggleAttr: function(name, val){
        return this.each(function(){
            var el = this;
            if (val && !el.hasAttribute(name) || !el.getAttribute(name)) {
                el.setAttribute(name, val);
            } else {
                el.removeAttribute(name);
            }
        });
    }
});

m4q.extend({
    meta: function(name){
        return not(name) ? m4q("meta") : $("meta[name='$name']".replace("$name", name));
    }
});