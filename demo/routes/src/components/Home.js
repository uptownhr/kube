import React from 'react'


const Test = function(){
  return <div>testzasdfzzzfff</div>
}

class Home extends React.Component{
  componentDidMount(){
    getState()
  }

  render(){
    let state = this.props.location.state
    return (
      <div>
        <h1>Home Page</h1>
        hisssss
        <pre>
        {JSON.stringify(state)}
        </pre>

        <Test />
      </div>
    )
  }
}

export default Home
