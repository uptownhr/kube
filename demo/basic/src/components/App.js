import React from 'react'
import ReactDOM from 'react-dom'

import './app.css'
import img from './cube.svg'

class App extends React.Component{
  render(){
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Kubing it!</h1>
        <img style={{width: '100%'}} src={img} />
        <br/><br/>
        <p>
          We can now get started
        </p>
      </div>
    )
  }
}

export default App