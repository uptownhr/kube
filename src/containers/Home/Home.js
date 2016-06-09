import React, { Component } from 'react';
import { Link } from 'react-router';
import {Row, Col} from 'react-bootstrap';

export default class Home extends Component {
  constructor(){
    super()
    this.state = {name: 'testing143342'}
  }
  componentWillMount(){
    let img = require('./logo.png')
    console.log('will mount')
  }

  componentDidMount(){
    console.log('did mount')
    let img = require('./logo.png')
    setTimeout(()=>{
      this.setState({name: 'zzzzdfdfdsdfsdfsdf', img})
    }, 1000)
  }
  render() {

    // require the logo image both from client and server
    return (
      <div onClick={this.click}>
        <Row>
          <Col md={1}>
            33
            </Col>
          </Row>
        {this.state.name}
        {this.state.img ? <img src={this.state.img} /> : ''}
      </div>
    );
  }

  click(){
    console.log('s')
  }
}