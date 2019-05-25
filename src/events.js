(function () {
    if ( typeof window.CustomEvent === "function" ) return false;

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

var overriddenStop =  Event.prototype.stopPropagation;
var overriddenPrevent =  Event.prototype.preventDefault;

Event.prototype.stopPropagation = function(){
    this.isPropagationStopped = true;
    overriddenStop.apply(this, arguments);
};
Event.prototype.preventDefault = function(){
    this.isPreventedDefault = true;
    overriddenPrevent.apply(this, arguments);
};

Event.prototype.stop = function(immediate){
    return immediate ? this.stopImmediatePropagation() : this.stopPropagation();
};

$.extend({
    events: [],
    eventHook: {},

    eventUID: 0,

    setEventHandler: function(el, eventName, handler, selector, ns, id){
        var i, freeIndex = -1, eventObj, resultIndex;
        if (this.events.length > 0) {
            for(i = 0; i < this.events.length; i++) {
                if (this.events[i].handler === null) {
                    freeIndex = i;
                    break;
                }
            }
        }

        eventObj = {
            element: el,
            eventName: eventName,
            handler: handler,
            selector: selector,
            ns: ns,
            id: id
        };

        if (freeIndex === -1) {
            this.events.push(eventObj);
            resultIndex = this.events.length - 1;
        } else {
            this.events[freeIndex] = eventObj;
            resultIndex = freeIndex;
        }

        return resultIndex;
    },

    getEventHandler: function(index){
        if (this.events[index] !== undefined && this.events[index] !== null) {
            this.events[index] = null;
            return this.events[index].handler;
        }
        return undefined;
    },

    off: function(){
        $.each(this.events, function(){
            this.element.removeEventListener(this.eventName, this.handler);
        });
        this.events = [];
        return this;
    },

    getEvents: function(){
        return this.events;
    },

    addEventHook: function(event, handler){},
    removeEventHook: function(event, index){},
    removeEventHooks: function(event){},
    clearEventHooks: function(){}
});

$.fn.extend({
    on: function(eventsList, sel, handler, options){
        var eventOptions;

        if (this.length === 0) {
            return ;
        }

        if (typeof sel === "function") {
            handler = sel;
            options = handler;
            sel = undefined;
        }

        options = isPlainObject(options) ? options : {};

        eventOptions = {
            once: options.once && options.once === true
        };

        return this.each(function(){
            var el = this;
            $.each(str2arr(eventsList), function(){
                var h, ev = this,
                    event = ev.split("."),
                    name = event[0],
                    ns = event[1],
                    index, originEvent;

                h = !sel ? handler : function(e){
                    var target = e.target;

                    while (target && target !== el) {
                        if (matches.call(target, sel)) {
                            handler.call(target, e);
                            if (e.isPropagationStopped) {
                                e.stop(true);
                            }
                        }
                        target = target.parentNode;
                    }
                };

                $.eventUID++;
                originEvent = name+(sel ? ":"+sel:"")+(ns ? ":"+ns:"");
                el.addEventListener(name, h, eventOptions);
                index = $.setEventHandler(el, name, h, sel, ns, $.eventUID);
                $(el).origin('event-'+originEvent, index);
            });
        });
    },

    one: function(events, sel, handler){
        return this.on(events, sel, handler,{once: true})
    },

    off: function(eventsList, sel){
        if (not(eventsList) || this.length === 0) {
            return ;
        }

        if (eventsList.toLowerCase() === 'all') {
            return this.each(function(){
                var el = this;
                $.each($.events, function(){
                    var e = this;
                    if (e.element === el) {
                        el.removeEventListener(e.eventName, e.handler);
                        e.handler = null;
                        $(el).origin("event-"+name+(e.selector ? ":"+e.selector:"")+(e.ns ? ":"+e.ns:""), null);
                    }
                })
            });
        }

        return this.each(function(){
            var el = this;
            $.each(str2arr(eventsList), function(){
                var evMap = this.split("."),
                    name = evMap[0],
                    ns = evMap[1],
                    originEvent, index;

                originEvent = "event-"+name+(sel ? ":"+sel:"")+(ns ? ":"+ns:"");
                index = $(el).origin(originEvent);

                if (index && $.events[index].handler) {
                    el.removeEventListener(name, $.events[index].handler);
                    $.events[index].handler = null;
                }

                $(el).origin(originEvent, null);
            });
        });
    },

    trigger: function(name, data){
        if (this.length === 0) {
            return ;
        }

        if (['focus', 'blur'].indexOf(name) > -1) {
            this[0][name]();
            return this;
        }

        var e = new CustomEvent(name, data || {});

        return this.each(function(){
            this.dispatchEvent(e);
        });
    },

    fire: function(name, data){
        if (this.length === 0) {
            return ;
        }

        if (['focus', 'blur'].indexOf(name) > -1) {
            this[0][name]();
            return this;
        }

        var e = document.createEvent('Events');
        e.detail = data;
        e.initEvent(name, true, false);

        return this.each(function(){
            this.dispatchEvent(e);
        });
    }
});

( "blur focus resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu load touchstart touchend touchmove touchcancel" )
    .split( " " )
    .forEach(
    function( name ) {
        $.fn[ name ] = function( sel, fn, opt ) {
            return arguments.length > 0 ?
                this.on( name, sel, fn, opt ) :
                this.trigger( name );
        };
});

$.fn.extend( {
    hover: function( fnOver, fnOut ) {
        return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
    }
});

$.ready = function(fn){
    document.addEventListener('DOMContentLoaded', fn);
};
