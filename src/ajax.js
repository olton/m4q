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
            m4q.each(function(k, v){
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
            m4q.each(p.data, function(k, v){
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
                if (p['onSuccess'] !== undefined) exec(p['onSuccess'], [e, xhr]);
            } else {
                exec(reject, [xhr]);
                if (p['onFail'] !== undefined) exec(p['onFail'], [e, xhr]);
            }
            if (p['onLoad'] !== undefined) exec(p['onLoad'], [e, xhr]);
        });

        xhr.addEventListener("readystatechange", function(e){
            if (p['onStateChange'] !== undefined) exec(p['onStateChange'], [e, xhr]);
        });

        xhr.addEventListener("error", function(e){
            exec(reject, [xhr]);
            if (p['onError'] !== undefined) exec(p['onError'], [e, xhr]);
        });

        xhr.addEventListener("timeout", function(e){
            exec(reject, [xhr]);
            if (p['onTimeout'] !== undefined) exec(p['onTimeout'], [e, xhr]);
        });

        xhr.addEventListener("progress", function(e){
            if (p['onProgress'] !== undefined) exec(p['onProgress'], [e, xhr]);
        });

        xhr.addEventListener("loadstart", function(e){
            if (p['onLoadStart'] !== undefined) exec(p['onLoadStart'], [e, xhr]);
        });

        xhr.addEventListener("loadend", function(e){
            if (p['onLoadEnd'] !== undefined) exec(p['onLoadEnd'], [e, xhr]);
        });

        xhr.addEventListener("abort", function(e){
            if (p['onAbort'] !== undefined) exec(p['onAbort'], [e, xhr]);
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

m4q.fn.extend({
    load: function(url, data, options){
        var that = this;
        m4q.get(url, data, options).then(function(data){
            that.each(function(){
                this.innerHTML = data;
            });
        });
    }
});