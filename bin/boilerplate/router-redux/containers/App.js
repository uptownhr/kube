import React from 'react'

import '../assets/app.css'
import cube from '../assets/cube.svg'

class App extends React.Component{
  render(){
    return (
      <div style={{padding: "15px"}}>
        <a href="/"> <img style={{width: '100px'}} src={cube} /></a>
        <a href="/about">About</a>
        {this.props.children}
      </div>
    )
  }
}

export default App