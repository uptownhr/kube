const React = require('react'),
  {server, hot} = require('./server'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router'),
  path = require('path'),
  express = require('express')

const app_root = path.dirname(require.main.filename)

const reaxMiddleware =  (req,res,next) => {
  res.reax = {
    render(state){
      console.log('reax-ssr: rendering', req.url, state)

      /*
      handle react route cache
       */
      let id = require.resolve( app_root + '/dist/routes')
      if (id) delete require.cache[id]
      const routes = require( app_root + '/dist/routes')

      match({routes,location:req.url}, (err, redirect, renderProps) => {
        renderProps.location.state = state

        const element = React.createElement(RouterContext, renderProps)

        const template = `
<html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
<link rel="stylesheet" href="/styles.css">
<script>
var state = ${JSON.stringify(state)}
</script>
<body>
<div id='root'>${ReactDOMServer.renderToString(element)}</div>
<script src="http://localhost:3000/static/bundle.js"></script>
</body>
</html>`

        res.send(template)
      })
    }
  }
  next()
}

module.exports = function(app){
  app.use(server,hot,reaxMiddleware, express.static(app_root + '/dist'))

  return app
}