$.fn.extend({
    val: function(value){
        if (this.length === 0) return ;

        if (not(value) && typeof this[0].value !== "undefined") {
            return this[0].value;
        }

        return this.each(function(){
            if (typeof this.value !== "undefined") {
                this.value = value;
            }
        });
    }
});