$.init = function(sel, ctx){
    var parsed;

    this.uid = $.uniqueId();

    if (!sel) {
        return this;
    }

    if (typeof sel === "function") {
        return $.ready(sel);
    }

    if (typeof sel === "object" && typeof jQuery !== "undefined" && sel instanceof jQuery) {
        return $.import(sel);
    }

    if (typeof sel === 'string' && sel === "document") {
        sel = document;
    }

    if (typeof sel === 'string' && sel === "body") {
        sel = document.body;
    }

    if (typeof sel === 'string' && sel === "html") {
        sel = document.documentElement;
    }

    if (typeof sel === 'string' && sel === "doctype") {
        sel = document.doctype;
    }

    if (sel.nodeType || sel.self === window) {
        this[0] = sel;
        this.length = 1;
        return this;
    }

    if (sel instanceof $) {
        var r = $();
        $.each(sel, function(){
            r.push(this);
        });
        return r;
    }

    if (typeof sel === "object") {
        return sel;
    }

    if (typeof sel === "string") {

        sel = sel.trim();

        if (sel === "#" || sel === ".") {
            throw new Error("sel can't be # or .") ;
        }

        parsed = $.parseHTML(sel, ctx);

        if (parsed.length === 1 && parsed[0].nodeType === 3) { // Must be a text node -> css sel
            [].push.apply(this, document.querySelectorAll(sel));
        } else {
            $.merge(this, parsed);
        }
    }

    if (ctx !== undefined && (ctx instanceof $ || ctx instanceof HTMLElement)) {
        this.each(function(){
            $(ctx).append($(this))
        });
    }

    return this;
};

$.init.prototype = $.fn;
