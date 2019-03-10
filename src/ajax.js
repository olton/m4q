
m4q.ajax = function(p){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest(), data;
        var method = (p.method || 'GET').toUpperCase();
        var headers = [];
        var async = not(p.async) ? true : p.async;
        var url = p.url;

        var exec = function(fn, params){
            if (typeof fn === "function") fn.apply(null, params);
        };

        if (p.data instanceof HTMLFormElement) {
            var _action = p.data.getAttribute("action");
            var _method = p.data.getAttribute("method");

            if (not(url) && _action && _action.trim() !== "") url = _action;
            if (_method && _method.trim() !== "") method = _method.toUpperCase();
        }

        xhr.open(method, url, async, p.user, p.password);

        if (p.timeout) {
            xhr.timeout = p.timeout;
        }

        if (p.withCredentials) {
            xhr.withCredentials = p.withCredentials;
        }

        if (p.headers) {
            m4q.each(function(v, k){
                xhr.setRequestHeader(k, v);
                headers.push(k);
            });
        }

        if (p.data instanceof HTMLFormElement) {
            data = new FormData(p.data);
        } else if (p.data instanceof HTMLElement && p.data.getAttribute("type").toLowerCase() === "file") {
            var _name = p.data.getAttribute("name");
            data = new FormData();
            for (var i = 0; i < p.data.files.length; i++) {
                data.append(_name, p.data.files[i]);
            }
        } else if (isPlainObject(p.data)) {
            var _data = [];
            m4q.each(p.data, function(v, k){
                _data.push(k+"="+v);
            });
            data = _data.join("&");
            if (headers.indexOf("Content-type") === -1) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
        } else {
            data = new FormData();
            data.append("_data", JSON.stringify(p.data));
        }

        xhr.send(data);

        xhr.addEventListener("load", function(e){
            if (xhr.readyState === 4 && xhr.status < 300) {
                var _return = p.returnValue && p.returnValue === 'xhr' ? xhr : p.parseJson ? JSON.parse(xhr.response) : xhr.response;
                exec(resolve, [_return]);
            } else {
                exec(reject, [xhr]);
            }
            exec(p.onload, [e, xhr]);
        });

        xhr.addEventListener("readystatechange", function(e){
            exec(p.onstate, [e, xhr]);
        });

        xhr.addEventListener("error", function(){
            exec(reject, [xhr]);
            exec(p.onerror, [e, xhr]);
        });

        xhr.addEventListener("timeout", function(e){
            exec(reject, [xhr]);
            exec(p.ontimeout, [e, xhr]);
        });

        xhr.addEventListener("progress", function(e){
            exec(p.onprogress, [e, xhr]);
        });

        xhr.addEventListener("loadstart", function(e){
            exec(p.onloadstart, [e, xhr]);
        });

        xhr.addEventListener("loadend", function(e){
            exec(p.onloadend, [e, xhr]);
        });

        xhr.addEventListener("abort", function(e){
            exec(p.onabort, [e, xhr]);
        });
    });
};

['get', 'post', 'put', 'patch', 'delete', 'json'].forEach(function(method){
    m4q[method] = function(url, data, options){
        var _method = method.toUpperCase();
        var _options = {
            method: _method === 'JSON' ? 'GET' : _method,
            url: url,
            data: data,
            parseJson: _method === 'JSON'
        };
        return m4q.ajax(m4q.extend({}, _options, options));
    }
});
