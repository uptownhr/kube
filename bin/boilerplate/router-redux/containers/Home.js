import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as listActions from '../actions/actionCreators'

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

        <h2>List from Reduxx</h2>
        <input ref="add" type="text" /><button onClick={this.add.bind(this)}>Add</button>
        <ul>
        {this.props.list.map( (item, index) => {
          return (
            <li key={index}>{item.name} -  <button onClick={this.remove.bind(this, index)}>Remove</button></li>
          )
        })}
        </ul>
      </div>
    )
  }

  remove(index){
    this.props.actions.removeList(index)
  }

  add(){
    let name = this.refs.add.value
    this.refs.add.value = ''
    this.props.actions.addList({ name })
  }
}

function mapStateToProps(state) {
  return {
    list: state.list
  }
}

function mapDispatchToProps(dispatch){
  return { actions: bindActionCreators(listActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
