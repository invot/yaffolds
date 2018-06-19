

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
    this.set = function(path, value) { // Update a single value or object
        if (~path.indexOf(".")) {
            let o = path.split(".")[0],
                p = this.get(o),
                q = path.split(".").slice(1);
            switch (q.length) { // There has to be a better way to do this. Don't look at me. I'm ashamed. 
                case 1:
                    p[q[0]] = value; 
                    break;
                case 2:
                    p[q[0]][q[1]] = value; 
                    break;
                case 3:
                    p[q[0]][q[1]][q[2]] = value; 
                    break;
                case 4:
                    p[q[0]][q[1]][q[2]][q[3]] = value; 
                    break;
                case 5:
                    p[q[0]][q[1]][q[2]][q[3]][q[4]] = value; 
                    break;
                case 6: // If your object goes deeper than this, reconsider your life choices. 
                    p[q[0]][q[1]][q[2]][q[3]][q[4]][q[5]] = value; 
                    break;
                default:  
                    return "error";
                    break;  
            }  
            b.setItem(o, JSON.stringify(p));
            return p;
        } else {
           b.setItem(path, JSON.stringify(value));
            return this.get(path);
        }
    };
    this.key = function(a) {
        if ("number" === typeof a) return b.key(a)
    };
    this.data = function() { // I honestly forgot what that is good for
        for (let a = 0, c = []; b.key(a);) c[a] = [b.key(a), this.get(b.key(a))], a++;
        return c.length ? c : null
    };
    this.remove = function(a) { // removes a single object from localstorage
        let c = !1;
        a = "number" === typeof a ? this.key(a) : a;
        a in b && (c = !0, b.removeItem(a));
        return c
    };
    this.clear = function() { // clears ALL your localstorage
        let a = b.length;
        b.clear();
        return a
    }
};
let local = new localStorageHandler();

// Constructor that renders handlebars files :)
let HandlesHandler = function(e, a, d) { // (elementID, appname, json data)
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
                local.set('lastRequest', data); // used to return someone to the route they requested after login
            },
            error: function(xhr, status, error) {
                callback(xhr); // error occur 
            }
        });
    }

    this.authorize = function(app, user) { // will return the requested app unless the user isn't logged in or is unauthorized
        if (!user) {
            user = local.get('user');
        }
        if(!app) {
            app = route.get(); 
        }
        console.log(app);
        console.log(user);
        if (user['session']['timeout']) {
            return local.get('config').routing.noUser
        } else {
            if (user.level < app.level) {
                return local.get('config').routing.noAccess
            } else {
                return app.app;
            }
        }
    }
    this.change = function(url, title) {
        // this.authorize(url);
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
if (!local.get('user')) {
    local.set('user', blankUser);
}

// Loads config data into localstorage
if(!local.get('config')) {
    $.getJSON('/data/config.json', function(r) {
        local.set('config', r);
    })
}

// Dom-specific functions

let loadingHandler = function() {
    let t = $('#loading'),
        m = $('#main');
    this.hide = function(speed,complete) {
        t.slideUp(speed,function(){t.removeClass('d-block'); complete});
    }
    this.show = function(speed,complete) {
        t.slideDown(speed,function(){t.addClass('d-block'); complete})
    }
    this.pageIn = function(speed,complete) {
        m.fadeIn(speed,function(){complete});
    }
    this.pageOut = function(speed,complete) {
        m.fadeOut(speed,function(){complete});
    }
}
let loading = new loadingHandler();

// window.onhashchange = route();
