import React from 'react'

class Home extends React.Component{
  render(){
    return (
      <div>
        <h1>Kube Boilerplate</h1>
        <p>Thanks for checking out kube</p>
        <p>Here are a few things you can try</p>

        <h2>Hot module reload</h2>
        <p>Just change something, it'll change without refresh</p>

        <h2>Server Side Rendering</h2>
        <p>Checkout the source, your react components are rendered server side</p>

        <h2>Routes</h2>
        <p>Click <a href="/about">here</a> to checkout another url. Note that, that will also be rendered from the server as well</p>
        <p> URLs are handled by react-router in the src/routes.js file.
        </p>
        <pre>
          {`
<Route path="/" component={App} >
  <IndexRoute component={Home} />
  <Route path="/about" component={About} />
</Route>
`}
        </pre>
      </div>
    )
  }
}

export default Home
