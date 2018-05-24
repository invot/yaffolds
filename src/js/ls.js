  let lsh = () => { // localStorage handler

    let _ls = localStorage;
    this.length = _ls.length;

    this.get = function(key) {
        try {
            return JSON.parse(_ls.getItem(key));
        } catch(e) {
            return _ls.getItem(key);
        }
    };

    this.set = function(key, val) {
        _ls.setItem(key,JSON.stringify(val));
        return this.get(key);
    };

    this.key = function(index) {
        if (typeof index === 'number') {
            return _ls.key(index);
        }
    };

    this.data = function() {
        let i       = 0;
        let data    = [];

        while (_ls.key(i)) {
            data[i] = [_ls.key(i), this.get(_ls.key(i))];
            i++;
        }

        return data.length ? data : null;
    };

    this.remove = function(keyOrIndex) {
        let result = false;
        let key = (typeof keyOrIndex === 'number') ? this.key(keyOrIndex) : keyOrIndex;

        if (key in _ls) {
            result = true;
            _ls.removeItem(key);
        }

        return result;
    };

    this.clear = function() {
        let len = _ls.length;
        _ls.clear();
        return len;
    };
}