# Yaffolds

Yet-Another-Scaffolding environment, or Yaffolds, is designed to kick-start the front-end development of any modern web project.

## Solid foundations for modern development

The purpose of Yaffolds is to provide a consistent file structure, easy to understand code, and methods that simply make sense and save time.

# Features

## Pug as templating system
- Use layouts and partials to power your static content.
- Easy, lightweight and powerful syntax ensure valid markup

## JSON and Handlebars to handle the dynamic content
- Secure and easy handlebars templates that bind with a JSON-based API that renders dynamic content.

## SASS, Fontawesome 5, and Bootstrap 4.1
- Customized build of [Bootstrap](https://getbootstrap.com/) 4.1 automatically compiled, optimized, and uglified for your convience
- Fontawesome 5 providing an extensive library of [beautiful icons](https://fontawesome.com/icons?from=io) 

## Gulp to make your life easier
- Compiles your `*.pug` pages
- Compiles your `*.scss` files
- Prefixes your css
- Bundles your `*.js` files
- Minify css and uglify js
- Serves your files (if you're into that sort of thing)
- Synchronizes and reloads your modifications across browsers

# Usage
  First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed. Also, install [Gulp](https://www.npmjs.com/package/gulp) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) globally.


## Plug and play
Get it from github:  

- Go to your project folder, and get those required packages by running: `npm install`
- Build everyting using gulp: `gulp build`

### Play

1. To start working and serving files run `gulp`
- Browser-sync will prompt the server url (`localhost:3000`)
- You can now edit `*.scss` & `*.js` files, `*.css` & `*.js` will be overwritten

