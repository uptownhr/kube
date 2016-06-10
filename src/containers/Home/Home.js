import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import './home.css'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = props.location.state
  }

  render() {
    let img = require('./logo.png')
    return (
      <Grid>
        <Row>
          <Col xs={3}>
            {this.state.name}
          </Col>
          <Col xs={5}>
            <img style={{width: '100%'}} src={img} />
          </Col>
        </Row>
        <Button onClick={this.click.bind(this)}>Change state</Button>
      </Grid>
    );
  }

  click(){
    this.setState({name: 'changed button'})
  }
}