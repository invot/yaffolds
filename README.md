# Yaffolds

Yet-Another-Scaffolding environment, or Yaffolds, is designed to kick-start the front-end development of any modern web project. 

## Solid foundations for modern development

The purpose of Yaffolds is to provide a consistent file structure, easy to understand code, and methods that simply make sense and save time. A Yaffolds-based project, upon completion, should allow for an easy hand-off between front-end and back-end developers. 


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

Requesting data is expensive. Yaffolds will prevent redundant requests by only asking for data when it doesn't have a recent version. And don't worry - Yaffolds encrypts what it keeps in local storage, keeping the data secure.  

## Really awesome config file

Configure app settings all in one file. Timeouts, default routes, security, and other often painful-to-make changes are all managed in a single, friendly JSON file. 

## Universal Print Styling

Pressing `ctrl+p` at any time will result in a beautiful result. A print-specific header and footer is loaded throughout the application. 


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

