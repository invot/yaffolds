

/* -- DEFINITIONS -- */


// Local sotrage handler with the following methods: get, set, data, key, remove, clear
let localStorageHandler = function() {
    let b = window.localStorage;
    this.length = b.length;
    this.get = function(a) {
        try {
            return JSON.parse(b.getItem(a))
        } catch (c) {
            return b.getItem(a)
        }
    };
    this.set = function(a, c) {
        b.setItem(a, JSON.stringify(c));
        return this.get(a)
    };
    this.key = function(a) {
        if ("number" === typeof a) return b.key(a)
    };
    this.data = function() {
        for (let a = 0, c = []; b.key(a);) c[a] = [b.key(a), this.get(b.key(a))], a++;
        return c.length ? c : null
    };
    this.remove = function(a) {
        let c = !1;
        a = "number" === typeof a ? this.key(a) : a;
        a in b && (c = !0, b.removeItem(a));
        return c
    };
    this.clear = function() {
        let a = b.length;
        b.clear();
        return a
    }
};
let lsh = new localStorageHandler();

// Constructor that renders handlebars files :)
let HandlesHandler = function(e, a, d) { // (elementID, appname, data)
    this.el = "string" == typeof e ? document.getElementById(e) : e, 
    this.tempName = a, 
    this.data = d || null, 
    this.folderPath = "/apps/";
    this.create = function() {
        let e = new XMLHttpRequest,
            t = this;
        e.open("get", this.folderPath + this.tempName, !0), e.onreadystatechange = function() {
            if (4 == e.readyState && 200 == e.status) {
                let n = Handlebars.compile(e.response);
                t.el.innerHTML = n(t.data)
            }
        }, e.send();
    };
};

// Constructor that manages routing :)
// You don't need to define routes because that's a pain. 
// This will check if the files needed to create your route 
// exists. If not, it will direct you to an error page or login.
let routeHandler = function() {
    let makeRouteData = function(url) {
        let hash = url.replace('#','').split('/').filter(x => x);
        r = new Object();
        r.hash = window.location.hash,
        r.location = window.location.href,
        r.app = hash[0],
        r.id = Number.isNaN(parseInt(hash[1])) ? null : hash[1],
        r.view = Number.isNaN(parseInt(hash[1])) ? hash[1] : null,
        r.mode = hash[2];
        return r;
    }
    this.get = function() { // returns the current route as an object
        let url = window.location.hash;
        return makeRouteData(url);
    }
    this.request = function(url, callback) {
        if (!callback) {
            callback = (e) => {return e}
        }
        let n = makeRouteData(url);
        $.ajax({
            url: "/apps/" + n.app + "/main.json", // server url
            type: 'GET', //POST or GET 
            datatype: 'json',
            success: function(data) {
                callback(data); // return data in callback
            },
            error: function(xhr, status, error) {
                callback(xhr.status); // error occur 
            }
        });
    }

    this.authorize = function(user, app) {
        // if (v) {
        //     let pth = Object.values(l).filter(x => x).join('/');
        //     window.location.hash = '/' + pth
        // } else {
        //     window.location.hash = '/login'
        // }
        // return route.get();
    }
    this.change = function(url, title) {

    }
}
let route = new routeHandler();

// Create user and session info if it doesn't exist
let blankUser = new Object({
    alias: '',
    dob: '',
    PIN: '',
    level: 0,
    name: {
        first: '',
        last: '',
        mi:'',
    },
    session: {
        token: '',
        timeout: true,
        lastChange: Date.now()
    }
});

// Loads user data into localstorage
if (!lsh.get('user')) {
    lsh.set('user', blankUser);
}

// Loads config data into localstorage
if(!lsh.get('config')) {
    $.getJSON('/data/config.json', function(r) {
        lsh.set('config', r);
    })
}



// window.onhashchange = route();
