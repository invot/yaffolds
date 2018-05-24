// Let's create a class that works as a local storage handler, k?
// methods include get, set, data, key, remove, clear
let LocalStorageHandler = function(){let b=window.localStorage;this.length=b.length;this.get=function(a){try{return JSON.parse(b.getItem(a))}catch(c){return b.getItem(a)}};this.set=function(a,c){b.setItem(a,JSON.stringify(c));return this.get(a)};this.key=function(a){if("number"===typeof a)return b.key(a)};this.data=function(){for(let a=0,c=[];b.key(a);)c[a]=[b.key(a),this.get(b.key(a))],a++;return c.length?c:null};this.remove=function(a){let c=!1;a="number"===typeof a?this.key(a):a;a in b&&(c=!0,b.removeItem(a));
return c};this.clear=function(){let a=b.length;b.clear();return a}};
let lsh = new LocalStorageHandler();

// Class that loads handlebars files
let HandlesHandler=function(e,t,n){this.el="string"==typeof e?document.getElementById(e):e,this.tempName=t,this.data=n||null,this.folderPath="/apps/"};HandlesHandler.prototype.create=function(){let e=new XMLHttpRequest,t=this;e.open("get",this.folderPath+this.tempName,!0),e.onreadystatechange=function(){if(4==e.readyState&&200==e.status){let n=Handlebars.compile(e.response);t.el.innerHTML=n(t.data)}},e.send()},HandlesHandler.prototype.createAndWait=function(){let e=new XMLHttpRequest;e.open("get",this.folderPath+this.tempName,!0),e.onreadystatechange=function(){if(4==e.readyState&&200==e.status)Handlebars.compile(e.response)},e.send()};

// function that gets the template html file
let loadJSON= function(e,n){let t=new XMLHttpRequest;t.overrideMimeType("application/json"),t.open("GET",e,!0),t.onreadystatechange=function(){4===t.readyState&&"200"==t.status&&n(JSON.parse(t.responseText))},t.send(null)};

// Let's store the user and session data in local storage, k?

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

if (!lsh.get('user')) {
    lsh.set('user', blankUser);
}

// Let's use the URL to figure out what information we want to present to the user, k?

let getLoc = () => {
    let hash = window.location.hash.replace('#','').split('/').filter(x => x),
        loc = new Object();
        loc.app = hash[0],
        loc.id = Number.isNaN(parseInt(hash[1])) ? null : hash[1],
        loc.view = Number.isNaN(parseInt(hash[1])) ? hash[1] : null,
        loc.mode = hash[2];
    return loc;
}

let setURL = (v) => {
    if (v) {
        let pth = Object.values(l).filter(x => x).join('/');
        window.location.hash = '/' + pth
    } else {
        window.location.hash = '/login'
    }
    return getLoc();
}

// Let's make sure there's no tomfoolery going on up in here, k?

let verify = (user) => {
    return !user.session.timeout; // this will be an API call
}

// Let's deliver content to the user (or not if they're not logged in), k?

let getApp = (app, loc) => {
    console.log(loc);
    $('x-hbs').each(function(){
        let id = $(this).attr('id'),
            dr = loc.app + '/' + app.landing + '.hbs';
        let hbr = new HandlesHandler(id, dr, app);
        hbr.create();
        $(this).hide().fadeIn();
    });
}

let getView = (l) => {
    let dir = '/apps/'+ l.app + '/main.json';
    loadJSON(dir, function(app){
        $('#app').load(app.view+".html",()=>{
            $('#loading').slideUp(500,()=>{
                $(this).removeClass('.d-block');
                getApp(app, l);
            });
        });
    });
}

let route = () => {
    let loc = setURL(verify(lsh.get('user')));
    getView(loc);
}

window.onhashchange = route();
