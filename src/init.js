
m4q.init = function(sel, ctx){
    var parsed;

    if (!sel) {
        return this;
    }

    if (typeof sel === "function") {
        return m4q.ready(sel);
    }

    if (typeof sel === "object" && typeof jQuery !== "undefined" && sel instanceof jQuery) {
        return m4q.import(sel);
    }

    if (sel === "document") {
        sel = document;
    }

    if (sel === "body") {
        sel = document.body;
    }

    if (sel.nodeType || sel === window) {
        this[0] = sel;
        this.length = 1;
        return this;
    }

    if (sel instanceof m4q) {
        return sel;
    }

    if (typeof sel === "object") {
        return sel;
    }

    if (typeof sel === "string") {

        sel = sel.trim();

        if (sel === "#" || sel === ".") {
            throw new Error("sel can't be # or .") ;
        }

        parsed = m4q.parseHTML(sel, ctx);

        if (parsed.length === 1 && parsed[0].nodeType === 3) { // Must be a text node -> css sel
            [].push.apply(this, document.querySelectorAll(sel));
        } else {
            m4q.merge(this, parsed);
        }
    }

    if (ctx !== undefined && (ctx instanceof m4q || ctx instanceof HTMLElement)) {
        this.each(function(el){
            $(ctx).append($(el))
        });
    }

    this.uid = m4q.uniqueId();

    return this;
};

m4q.init.prototype = m4q.fn;
