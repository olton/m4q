$.fn.extend({
    html: function(value){
        if (value instanceof $) {
            value = value.outerHTML();
        }
        return arguments.length === 0 ? this._prop('innerHTML') : this._prop('innerHTML', typeof value === "undefined" ? "" : value);
    },

    outerHTML: function(){
        return this._prop('outerHTML');
    },

    text: function(value){
        return arguments.length === 0 ? this._prop('textContent') : this._prop('textContent', typeof value === "undefined" ? "" : value);
    },

    innerText: function(value){
        return arguments.length === 0 ? this._prop('innerText') : this._prop('innerText', typeof value === "undefined" ? "" : value);
    },

    empty: function(){
        return this.each(function(){
            this.innerHTML = "";
        });
    }
});

