import React from 'react'


const Test = function(){
  return <div>testzasdfzzzfff</div>
}

class About extends React.Component{
  render(){
    let state = this.props.location.state
    return (
      <div>
        <h1>About Page</h1>
        hisssss
        <pre>
        {JSON.stringify(state)}
        </pre>

        <Test />
      </div>
    )
  }
}

export default About
