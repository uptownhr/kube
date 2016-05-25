const path = require('path')

console.log(process.env.NODE_ENV)

module.exports = {
  entry: ['babel-polyfill', './components/index.jsx'],
  output: {
    filename: 'popup-bundle.js',
    path: '../../chrome_release/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, "node_modules"),
        query: {
          presets: ['es2015','stage-3',  'react' ]
        }
      }
    ]
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
//    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      config: path.join(__dirname, 'config', process.env.NODE_ENV)
    }
  }
}
