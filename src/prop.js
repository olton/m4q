$.fn.extend({
    _prop: function(prop, value){
        if (this.length === 0) {
            return ;
        }

        if (arguments.length === 1) {
            return this[0][prop];
        }

        if (not(value)) {
            value = '';
        }

        this.each(function(){
            var el = this;

            el[prop] = value;

            if (prop === "innerHTML") {
                $.each($(el).find("script"), function(){
                    var script = this;
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    if (script.src) {
                        s.src = script.src;
                    } else {
                        s.textContent = script.innerText;
                    }
                    document.body.appendChild(s);
                    script.parentNode.removeChild(script);
                });
            }
        });

        return this;
    },

    prop: function(prop, value){
        return arguments.length === 0 ? this._prop(prop) : this._prop(prop, typeof value === "undefined" ? "" : value);
    }
});