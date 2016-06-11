const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  { match, RouterContext } = require('react-router')

module.exports = function({ kube_path, project_routes, mount = false }){
  return function(req,res,next){
    /*
     handle react route cache
     */
    let id = require.resolve( kube_path + '/public/dist/routes' )
    if (id) delete require.cache[id]
    const routes = require( kube_path + '/public/dist/routes' )

    if(mount){
      res.kube = {
        render: function(state){
          match({routes,location:req.url}, (err, redirect, renderProps) => {
            renderProps.location.state = state

            const routerElement = React.createElement(RouterContext, renderProps)
            const template = render_layout(routerElement, state)

            res.send(template)
          })
        }
      }

      return next()
    }

    console.log('kube-ssr: rendering', req.url)

    if(project_routes){
      const state = {}
      match({routes,location:req.url}, (err, redirect, renderProps) => {
        renderProps.location.state = state

        const routerElement = React.createElement(RouterContext, renderProps)
        const template = render_layout(routerElement, state)

        res.send(template)
      })
    }else{
      const element = React.createElement(routes)
      const template = render_layout(element)

      res.send(template)
    }
  }
}

function render_layout(element, state={}) {
  return `
<html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
<link rel="stylesheet" href="/dist/styles.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.8.0/jquery.fullPage.css" />
<body>
<div id='root'>${ReactDOMServer.renderToString(element)}</div>
<script src="http://localhost:3000/dist/bundle.js"></script>
</body>
</html>`
}