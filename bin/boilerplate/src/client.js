import { h, render } from 'preact'

const selector = document.querySelector('#root')
const state = window.__INITIAL_STATE


let root;
function init() {
  let App = require('./components/App');
  root = render(<App {...state} />, document.body, selector)
}

init()

if(module.hot){
  console.log('hot')
  module.hot.accept('./components/App', () => requestAnimationFrame( () => {
    init()
  }) );
}
