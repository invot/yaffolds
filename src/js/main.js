Object.isObject = function(obj) {
    return obj && obj.constructor === this || false;
};

/* -- DEFINITIONS -- */

// Local sotrage handler with the following methods: get, set, data, key, remove, clear
// if session is true, then storage scoped to the current active tab 
let storageHandler = function(session) { 
    let b = session ? window.sessionStorage : window.localStorage,
       _t = this;
    this.length = b.length;

    _t.get = function(path) {
        if (~path.indexOf(".")) {
            let o = path.split(".")[0],
                p = JSON.parse(b.getItem(o)),
                q = path.split(".").slice(1);
                return q.reduce((o,i)=>o[i], p);
        } else {
            try {
                return JSON.parse(b.getItem(path))
            } catch (c) {
                return b.getItem(path)
            }
        }
    };
    _t.set = function(path, value) { // Update a single value or object
        if (~path.indexOf(".")) {
            let o = path.split(".")[0],
                p = _t.get(o),
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
            return _t.get(path);
        }
    };
    _t.key = function(a) { 
        if ("number" === typeof a) return b.key(a)
    };

    _t.remove = function(a) { // removes a single object from storage
        let c = !1;
        a = "number" === typeof a ? this.key(a) : a;
        a in b && (c = !0, b.removeItem(a));
        return c
    };
    _t.clear = function() { // clears everything in storage
        let a = b.length;
        b.clear();
        return a
    }
};
let local = new storageHandler(false);

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
    let _rh = this;
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
        if (!url) {
            url = _rh.get();
        }
        if (!callback) {
            callback = function(e){return e};
        }
        // let view = ""
        // if (url.id) {
        //     view = "single/"
        // }
        // if (url.view) {
        //     view = url.view + "/"
        // }
        local.set( 'lastRequest', url );
        let l = local.get('lastRequest');
        $.ajax({
            url: "/apps/" + l.app + view + "/main.json", // server url
            type: 'GET', //POST or GET 
            datatype: 'json',
            success: function(data) {
                l = local.set('lastRequest.data', data); // used to return someone to the route they requested after login
                console.log(l);
                return callback(l); // return data in callback
            },
            error: function(xhr, status, error) {
                l = local.set('lastRequest.data', xhr); 
                console.log(l);
                return callback(l); // error occur 
            }
        });
    }

    this.authorize = function(user, url) { // returns a login or error page if the use isn't authorized to view the requested app
        if (!user) {
            user = local.get('user');
        }
        if(!url) {
            url = _rh.get(); 
        }
        if (user['session']['timeout'] == true) {
            return local.get('config').routing.noUser
        } else {
            if (user.level < url.level) {
                return local.get('config').routing.noAccess
            } else {
                return url.app;
            }
        }
    }
    this.alias = function(url) { // checks to see if your url is a known alias for an app
        if (!url) {
            url = _rh.get();
        }
        let ret = null,
            list = Object.entries(local.get('config').routing.alias);   
        for (i=0; i<list.length; i++) {
            if ( list[i][1].includes(url) ) {
                ret = list[i][0];
                break;
            }
        }
        if (ret)
            { return ret }
        else
            { return url }
    }
    this.change = function(url, title) {
        if (!url) {
            url = _rh.get();
        } else {
            url = makeRouteData(url);
        }
        if (!title) {
            title = url.app;
        }
        url = this.authorize(null, url);
        this.request(url, function(req){
            console.log(req);
            if (!title) {
                title = req.data.title;
            }
            history.pushState({}, 
                local.get('config').project.name + " | " + title,
                '/#/'+ req.app + '/'
            );
        });
    }
    this.loadApp = function() {

    }

    this.loadView = function() {

    }

    this.loadRecord = function() {

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



// Initialize router
// window.onhashchange = route.change(); 