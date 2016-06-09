import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

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
    setTimeout(()=>{
      this.setState({name: 'zzzzdfdfdsdfsdfsdf'})
    }, 1000)
  }
  render() {
    let img = require('./logo.png')
    // require the logo image both from client and server
    return (
      <Grid>
        <Row>
          <Col xs={3}>
            {this.state.name}
          </Col>
          <Col xs={5}>
            <img src={img} />
          </Col>
        </Row>
        <Button>Test</Button>
      </Grid>
    );
  }

  click(){
    console.log('s')
  }
}