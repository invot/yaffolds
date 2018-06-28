<img src="https://img.shields.io/badge/version-0.2.2_pre--alpha-red.svg" alt="version 0.2.2"> <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="build is passing"> 


<p align="center"><img src="src/img/logo.png" title="Yaffolds" width="200" height="255"></p>

<p style="color:#f00">THIS SOFTWARE IS CURRENTLY PRE-ALPHA AND NON-FUNCTIONING.</p>

Yet-Another-Scaffolding environment, or Yaffolds, is designed to kick-start the front-end development of any modern web project. 

## Solid foundations for modern development
The purpose of Yaffolds is to provide a consistent file structure, easy to understand code, and methods that simply make sense and save time. A Yaffolds-based project, upon completion, should allow for an easy hand-off between front-end and back-end developers. 

## Philosophy
Cutting-edge technologies take a back seat to tried-and-true solutions with extensive documentation and a large user-base. It should be easy for any developer to take a look at the code and hit the ground running. Most of the complicated stuff is abstracted through easy-to-understand handlers and methods. 

Yaffolds seperates your application into sub-apps that exist in a series of views and modes. A view would be `list`, `single`, and `embed` while a mode would be `history` or `edit`. This is similar to many popular frameworks that exist today. This serves as the basic structure for every sub-app, but can be customized in any way.

## Browser support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE 11+ | Yes | Yes | 11.1+ | Yes | Unoffical | Yes


# Features

## Pug as templating system
- Use layouts and partials to power your static content
- Easy, lightweight and powerful syntax ensures valid markup

## Handlebars to handle the dynamic content
- Secure and easy handlebars templates to render dynamic content

## SASS, Fontawesome 5, and Bootstrap 4.1
- Customized build of [Bootstrap](https://getbootstrap.com/) 4.1 automatically compiled, optimized, and uglified for your convience
- Fontawesome 5 providing an extensive library of [beautiful icons](https://fontawesome.com/icons?from=io) 

## Gulp to make your life easier
- Compiles your `*.pug` pages
- Compiles your `*.scss` files
- Prefixes your css
- Bundles your `*.js` files
- Minify css and uglify js
- Serves your files 
- Synchronizes and reloads your modifications across browsers

## Flat-File JSON Mock Server

Even "mock-server" might be a strong term. Simple JSON files take the place of SQL, mongo, or whatever other kind of database you'd like to use in the real world. Schemas aren't required, but these files should hint at how a backend should eventually be structured. 

## Aggressive request-limiting

Requesting data is expensive. Yaffolds will prevent redundant requests by only asking for data when it doesn't have a recent version. Data can be stored in `localStorage` or `sessionStoragte` or both! The information is protected by [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Cross-origin_data_storage_access) automatically, keeping locally-stored data secure. 

## Really awesome config file

Configure app settings all in one file. Timeouts, default routes, security, and other often painful-to-make changes are all managed in a single, friendly JSON file. 

## Universal Print Styling

Pressing `ctrl+p` at any time will result in something beautiful. A print-specific header and footer is loaded throughout the application. 


# Requirements

First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed. Also, install [Gulp](https://www.npmjs.com/package/gulp) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) globally.


# Install

## 1. Plug
Get it from github (if you're reading this, then good job!):  
- Go to your project folder, and get those required packages by running: `npm install`
- Build everyting using gulp: `gulp build`

## 2. Play
To start working and serving files run `gulp`
- Browser-sync will prompt the server url (`localhost:3000`)
- You can now edit `*.scss` & `*.js` files, and the `*.css` & `*.js` will be overwritten

