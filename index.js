require('babel-register')
const express = require('express'),
  app = express(),
  { server, hot } = require('./server')

app.use( server, hot )

const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router')



app.get('/', (req,res) => {
  let id = require.resolve('./src/routes')
  if(id) require.uncache('./src/routes')
  console.log( require.cache[id] )

  const routes = require('./src/routes')


  match({routes,location:req.url}, (err, redirect, renderProps) => {
    const element = React.createElement(RouterContext, renderProps)
    const template = `<html><body><div id='root'>${ReactDOMServer.renderToString(element)}</div><script src="http://localhost:3000/static/bundle.js"></script></body></html>`.replace(/\s+/g, ' ').trim();
    res.send(template)
  })
})

app.listen(3000)



/**
 * Removes a module from the cache
 */
require.uncache = function (moduleName) {
  // Run over the cache looking for the files
  // loaded by the specified module name
  require.searchCache(moduleName, function (mod) {
    delete require.cache[mod.id];
  });

  // Remove cached paths to the module.
  // Thanks to @bentael for pointing this out.
  Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
    if (cacheKey.indexOf(moduleName)>0) {
      delete module.constructor._pathCache[cacheKey];
    }
  });
};

/**
 * Runs over the cache to search for all the cached
 * files
 */
require.searchCache = function (moduleName, callback) {
  // Resolve the module identified by the specified name
  var mod = require.resolve(moduleName);

  // Check if the module has been resolved and found within
  // the cache
  if (mod && ((mod = require.cache[mod]) !== undefined)) {
    // Recursively go over the results
    (function run(mod) {
      // Go over each of the module's children and
      // run over it
      mod.children.forEach(function (child) {
        run(child);
      });

      // Call the specified callback providing the
      // found module
      callback(mod);
    })(mod);
  }
};