import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Home extends Component {
  constructor(){
    super()
    this.state = {name: 'testing12'}
  }
  componentWillMount(){
    console.log('will mount')
  }

  componentDidMount(){
    console.log('component did mount')
    setTimeout(()=>{
      this.setState({name: 'zzzzdfdfdsdfsdfsdf'})
    }, 1000)
  }
  render() {
    console.log('render')
    // require the logo image both from client and server
    return (
      <div> {this.state.name}z</div>
    );
  }
}