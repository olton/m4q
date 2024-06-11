$.extend({

    device: (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())),
    localhost: isLocalhost(),
    isLocalhost: isLocalhost,
    touchable: isTouch(),
    isPrivateAddress: isPrivateAddress,

    uniqueId: function (prefix) {
        var d = new Date().getTime();
        if (not(prefix)) {
            prefix = 'm4q';
        }
        return (prefix !== '' ? prefix + '-' : '') + 'xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    toArray: function(n){
        var i, out = [];

        for (i = 0 ; i < n.length; i++ ) {
            out.push(n[i]);
        }

        return out;
    },

    import: function(ctx){
        var res = [];
        this.each(ctx, function(){
            res.push(this);
        });
        return this.merge($(), res);
    },

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
        /* eslint-disable-next-line */
        while (new Date() < ms){}
    },

    isSelector: function(selector){
        if (typeof selector !== 'string') {
            return false;
        }
        try {
            document.querySelector(selector);
        } catch(error) {
            return false;
        }
        return true;
    },

    remove: function(s){
        return $(s).remove();
    },

    isPlainObject: isPlainObject,
    isEmptyObject: isEmptyObject,
    isArrayLike: isArrayLike,
    acceptData: acceptData,
    not: not,
    parseUnit: parseUnit,
    getUnit: getUnit,
    unit: parseUnit,
    isVisible: isVisible,
    isHidden: isHidden,
    matches: function(el, s) {return matches.call(el, s);},
    random: function(from, to) {
        if (arguments.length === 1 && isArrayLike(from)) {
            return from[Math.floor(Math.random()*(from.length))];
        }
        return Math.floor(Math.random()*(to-from+1)+from);
    },
    hasProp: hasProp,
    dark: globalThis.matchMedia && globalThis.matchMedia('(prefers-color-scheme: dark)').matches,

    serializeToArray: function(form){
        var _form = $(form)[0];
        if (!_form || _form.nodeName !== "FORM") {
            console.warn("Element is not a HTMLFromElement");
            return;
        }
        var i, j, q = [];
        for (i = _form.elements.length - 1; i >= 0; i = i - 1) {
            if (_form.elements[i].name === "") {
                continue;
            }
            switch (_form.elements[i].nodeName) {
                case 'INPUT':
                    switch (_form.elements[i].type) {
                        case 'checkbox':
                        case 'radio':
                            if (_form.elements[i].checked) {
                                q.push(_form.elements[i].name + "=" + encodeURIComponent(_form.elements[i].value));
                            }
                            break;
                        case 'file':
                            break;
                        default: q.push(_form.elements[i].name + "=" + encodeURIComponent(_form.elements[i].value));
                    }
                    break;
                case 'TEXTAREA':
                    q.push(_form.elements[i].name + "=" + encodeURIComponent(_form.elements[i].value));
                    break;
                case 'SELECT':
                    switch (_form.elements[i].type) {
                        case 'select-one':
                            q.push(_form.elements[i].name + "=" + encodeURIComponent(_form.elements[i].value));
                            break;
                        case 'select-multiple':
                            for (j = _form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (_form.elements[i].options[j].selected) {
                                    q.push(_form.elements[i].name + "=" + encodeURIComponent(_form.elements[i].options[j].value));
                                }
                            }
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (_form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            q.push(_form.elements[i].name + "=" + encodeURIComponent(_form.elements[i].value));
                            break;
                    }
                    break;
            }
        }
        return q;
    },
    serialize: function(form){
        return $.serializeToArray(form).join("&");
    },
    compose: function(...functions){
        return (first) => functions.reduceRight((acc, fn) => fn(acc), first);
    },
    pipe: function(...functions){
        return (first) => functions.reduce((acc, fn) => fn(acc), first);
    },
    curry: function(func){
        return function curried(...args) {
            if (args.length >= func.length) {
                return func.apply(this, args);
            } else {
                return function(...args2) {
                    return curried.apply(this, args.concat(args2));
                };
            }
        };
    },
    memoize: function(fn){
        const cache = new Map()
        return function (...args) {
            const key = "" + args.length + args.join("+")
            if (cache.has(key)) {
                return cache.get(key);
            } else {
                const result = fn.apply(this, args)
                cache.set(key, result);
                return result
            }
        }
    }
});

$.fn.extend({
    items: function(){
        return $.toArray(this);
    }
});