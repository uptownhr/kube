import React from 'react'
import ReactDOM from 'react-dom'

import './app.css'
import img from './cube.svg'

class App extends React.Component{
  render(){
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Kubing it!</h1>
        <img style={{width: '100%'}} src={img} />
      </div>
    )
  }
}

export default App