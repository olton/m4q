function createScript(script){
    var s = document.createElement('script');
    s.type = 'text/javascript';
    if (script.src) {
        s.src = script.src;
    } else {
        s.textContent = script.innerText;
    }
    document.body.appendChild(s);
    script.parentNode.removeChild(script);
    return s;
}

$.extend({
    script: function(el){
        if (el.tagName && el.tagName === "SCRIPT") {
            createScript(el);
        } else $.each($(el).find("script"), function(){
            createScript(this);
        });
    }
});

$.fn.extend({
    script: function(){
        return this.each(function(){
            $.script(this);
        })
    }
});