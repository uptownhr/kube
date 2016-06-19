const fs = require('fs')

module.exports = function({ public_path, express_handler_path, layout_path, debug, mount = false }){
  return function(req,res,next){
    if(isAsset(public_path, req.url)) return next()

    /*
     handle server component cache
     */
    let id = require.resolve( public_path + '/dist/routes' )
    if (id) delete require.cache[id]
    const ServerComponent = require( public_path + '/dist/routes' )

    /*
    handle server component compilation
     */
    let id2 = require.resolve( express_handler_path )
    if (id2) delete require.cache[id2]
    const ServerCompiler = require( express_handler_path )

    /*
    handle layout rendering
     */
    let id3 = require.resolve( layout_path )
    if (id3) delete require.cache[id3]
    const LayoutRender = require( layout_path )

    if(debug){
      console.log('debug: ', debug)
      console.log('kube-ssr: rendering', req.url)
      console.log('using: ' + express_handler_path)
      console.log('and: ' + layout_path)
    }


    if(mount){
      res.kube = {
        render: function(state){
          const renderString = ServerCompiler(ServerComponent, req.url, state)

          const bundlePath = '/dist/bundle.js',
            stylePath = '/dist/styles.css'

          const template = LayoutRender({bundlePath, stylePath, renderString, stateString: JSON.stringify(state)})

          res.send(template)
        }
      }

      return next()
    }

    const state = {}
    const renderString = ServerCompiler(ServerComponent, req.url, state)

    const bundlePath = '/dist/bundle.js',
      stylePath = '/dist/styles.css'

    const template = LayoutRender({bundlePath, stylePath, renderString, stateString: JSON.stringify(state)})

    res.send(template)
  }
}

function isAsset(public_path, url){
  if(url == '/') return false

  const asset_path = public_path + url

  try{
    fs.lstatSync(asset_path)
    return true
  }catch(e){
    return false
  }
}