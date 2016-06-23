import { h, Component } from 'preact'

import './app.css'
import img from './cube.svg'

class App extends Component{
  render(){
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Kubing it!</h1>
        <img style={{width: '100%'}} src={img} />
        <br/><br/>
        <p>
          We can now get started. Change me for HMR
        </p>
      </div>
    )
  }
}

export default App