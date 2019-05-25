$.parseHTML = function(data, context){
    var base, singleTag, result = [], ctx, _context;

    if (typeof data !== "string") {
        return [];
    }

    data = data.trim();

    ctx = document.implementation.createHTMLDocument("");
    base = ctx.createElement( "base" );
    base.href = document.location.href;
    ctx.head.appendChild( base );
    _context = ctx.body;

    singleTag = regexpSingleTag.exec(data);

    if (singleTag) {
        result.push(document.createElement(singleTag[1]));
    } else {
        _context.innerHTML = data;
        for(var i = 0; i < _context.childNodes.length; i++) {
            result.push(_context.childNodes[i]);
        }
    }

    if (context && !(context instanceof $) && isPlainObject(context)) {
        $.each(result,function(){
            var el = this;
            for(var name in context) {
                if (context.hasOwnProperty(name))
                    el.setAttribute(name, context[name]);
            }
        });
    }

    return result;
};
