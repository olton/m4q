
m4q.fn.extend({
    offset: function(val){
        var rect;
        if (this.length === 0) {
            return ;
        }
        if (not(val)) {
            rect = this[0].getBoundingClientRect();
            return {
                top: rect.top + pageYOffset,
                left: rect.left + pageXOffset
            }
        }
        return this.each(function(){ //?
            $(this).css({
                top: val.top,
                left: val.left
            })
        });
    },

    position: function(margin){
        var ml = 0, mt = 0;

        margin = !!margin;

        if (this.length === 0) {
            return ;
        }

        if (margin) {
            ml = parseInt(getComputedStyle(this[0], null)['margin-left']);
            mt = parseInt(getComputedStyle(this[0], null)['margin-top']);
        }

        return {
            left: this[0].offsetLeft - ml,
            top: this[0].offsetTop - mt
        }
    }
});