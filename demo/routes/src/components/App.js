import React from 'react'
import ReactDOM from 'react-dom'

import {Link} from 'react-router'

import './app.css'
import img from './cube.svg'

class App extends React.Component{

  render(){
    return (
      <div style={{textAlign: 'center'}}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <h1>Kubing it!</h1>
        <img style={{width: '100%'}} src={img} />
        <br/><br/>
        {this.props.children}
      </div>
    )
  }
}

export default App