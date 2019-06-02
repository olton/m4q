$.extend({
    merge: function( first, second ) {
        var len = +second.length,
            j = 0,
            i = first.length;

        for ( ; j < len; j++ ) {
            first[ i++ ] = second[ j ];
        }

        first.length = i;

        return first;
    },

    type: function(obj){
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)]$/, '$1').toLowerCase();
    },

    sleep: function(ms) {
        ms += new Date().getTime();
        while (new Date() < ms){}
    },

    camelCase: function(string){return camelCase(string);},
    isPlainObject: function(obj){return isPlainObject(obj);},
    isEmptyObject: function(obj){return isEmptyObject(obj);},
    isArrayLike: function(obj){return isArrayLike(obj);},
    acceptData: function(owner){return acceptData(owner);},
    not: function(val){return not(val)},
    parseUnit: function(str, out){return parseUnit(str, out)},
    unit: function(str, out){return parseUnit(str, out)}
});

$.fn.extend({
    items: function(){
        return $.toArray(this);
    },

    clone: function(){
        var res = [], out = $();
        this.each(function(){
            res.push(this.cloneNode(true));
        });
        return $.merge(out, res);
    }
});