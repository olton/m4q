$.ajax = function(p){
    return new Promise(function(resolve, reject){
        const xhr = new XMLHttpRequest()
        let method = (p.method || "GET").toUpperCase();
        const headers = [];
        const async = not(p.async) ? true : p.async;
        let url = p.url;

        let data;

        const exec = function(fn, params){
            if (typeof fn === "function") {
                fn.apply(null, params);
            }
        };

        const isGet = function(method){
            return ["GET", "JSON"].indexOf(method) !== -1;
        };

        const plainObjectToData = function(obj){
            const _data = [];
            $.each(obj, function(k, v){
                const _v = isSimple(v) ? v : JSON.stringify(v);
                _data.push(k+"=" + _v);
            });
            return _data.join("&");
        };

        if (p.data instanceof HTMLFormElement) {
            let _action = p.data.getAttribute("action").trim();
            let _method = p.data.getAttribute("method").trim();

            if (not(url) && _action) {url = _action;}
            if (_method) {method = _method.toUpperCase();}
        }


        if (p.timeout) {
            xhr.timeout = p.timeout;
        }

        if (p.withCredentials) {
            xhr.withCredentials = p.withCredentials;
        }

        if (p.data instanceof HTMLFormElement) {
            data = $.serialize(p.data);
        } else if (p.data instanceof HTMLElement && p.data.getAttribute("type") && p.data.getAttribute("type").toLowerCase() === "file") {
            const _name = p.data.getAttribute("name");
            data = new FormData();
            for (let i = 0; i < p.data.files.length; i++) {
                data.append(_name, p.data.files[i]);
            }
        } else if (isPlainObject(p.data)) {
            data = plainObjectToData(p.data);
        } else if (p.data instanceof FormData) {
            data = p.data;
        } else if (typeof p.data === "string") {
            data = p.data;
        } else {
            data = new FormData();
            data.append("_data", JSON.stringify(p.data));
        }

        if (isGet(method)) {
            url += (typeof data === "string" ? "?"+data : isEmptyObject(data) ? "" : "?"+JSON.stringify(data));
        }

        xhr.open(method, url, async, p.user, p.password);
        if (p.headers) {
            $.each(p.headers, function(k, v){
                xhr.setRequestHeader(k, v);
                headers.push(k);
            });
        }
        if (!isGet(method)) {
            if (headers.indexOf("Content-type") === -1 && p.contentType !== false) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
        }
        xhr.send(data);

        xhr.addEventListener("load", function(e){
            if (xhr.readyState === 4 && xhr.status < 300) {
                let _return = p.returnValue && p.returnValue === 'xhr' ? xhr : xhr.response;
                if (p.parseJson) {
                    try {
                        _return = JSON.parse(_return);
                    } catch (ex) {
                        _return = {};
                    }
                }
                exec(resolve, [_return]);
                exec(p.onSuccess, [e, xhr]);
            } else {
                exec(reject, [xhr]);
                exec(p.onFail, [e, xhr]);
            }
            exec(p.onLoad, [e, xhr]);
        });

        $.each(["readystatechange", "error", "timeout", "progress", "loadstart", "loadend", "abort"], function(){
            const ev = camelCase("on-"+(this === 'readystatechange' ? 'state' : this));
            xhr.addEventListener(ev, function(e){
                exec(p[ev], [e, xhr]);
            });
        });
    });
};

['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'JSON'].forEach(function(method){
    $[method.toLowerCase()] = function(url, data, options){
        const _options = {
            method: method === 'JSON' ? 'GET' : method,
            url: url,
            data: data,
            parseJson: method === 'JSON'
        };
        return $.ajax($.extend({}, _options, options));
    };
});

$.fn.extend({
    load: function(url, data, options){
        const that = this;

        if (this.length && this[0].self === window ) {
            return $.load(url);
        }

        return $.get(url, data, options).then(function(data){
            that.each(function(){
                this.innerHTML = data;
            });
        });
    }
});