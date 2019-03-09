
// Polyfills for IE11
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('prepend')) {
            return;
        }
        Object.defineProperty(item, 'prepend', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function prepend() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.insertBefore(docFrag, this.firstChild);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

m4q.fn.extend({
    append: function(elements){
        if (typeof elements === "string") {
            elements = m4q.parseHTML(elements);
        }
        return this.each(function(el, elIndex){
            m4q.each(elements, function(child){
                el.append(elIndex === 0 ? child : child.cloneNode(true));
            });
        })
    },

    appendTo: function(elements){
        if (typeof elements === "string") {
            elements = m4q.parseHTML(elements);
        }
        return this.each(function(el){
            m4q.each(elements, function(parent, parIndex){
                parent.append(parIndex === 0 ? el : el.cloneNode(true));
            });
        })
    },

    prepend: function(elements){
        if (typeof elements === "string") {
            elements = m4q.parseHTML(elements);
        }
        return this.each(function (el, elIndex) {
            m4q.each(elements, function(child){
                el.prepend(elIndex === 0 ? child : child.cloneNode(true))
            });
        })
    },

    prependTo: function(elements){
        if (typeof elements === "string") {
            elements = m4q.parseHTML(elements);
        }
        return this.each(function(el){
            m4q.each(elements, function(parent, parIndex){
                $(parent).prepend(parIndex === 0 ? el : el.cloneNode(true));
            })
        })
    },

    insertBefore: function(elements){
        if (typeof elements === "string") {
            elements = m4q.parseHTML(elements);
        }
        return this.each(function(el){
            m4q.each(elements, function(element, elIndex){
                element.parentNode.insertBefore(elIndex === 0 ? el : el.cloneNode(true), element);
            });
        })
    },

    insertAfter: function(elements){
        if (typeof elements === "string") {
            elements = m4q.parseHTML(elements);
        }
        return this.each(function(el){
            m4q.each(elements, function(element, elIndex){
                element.parentNode.insertBefore(elIndex === 0 ? el : el.cloneNode(true), element.nextSibling);
            });
        });
    },

    after: function(html){
        return this.each(function(el){
            el.insertAdjacentHTML('afterend', html);
        })
    },

    before: function(html){
        return this.each(function(el){
            el.insertAdjacentHTML('beforebegin', html);
        })
    },

    clone: function(){
        var res = [], out = m4q();
        this.each(function(el){
            res.push(el.cloneNode(true));
        });
        return m4q.merge(out, res);
    },

    remove: function(selector){
        var i = 0, node, out = [];

        if (this.length === 0) {
            return ;
        }

        for ( ; ( node = this[ i ] ) != null; i++ ) {
            if (node.parentNode) {
                out.push(node.parentNode.removeChild(node));
            }
        }

        return selector ? out.filter(function(el){
            return matches.call(el, selector);
        }) : out;
    }
});