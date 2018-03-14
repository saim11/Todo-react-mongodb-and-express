import React, { Component } from 'react';
import axios from 'axios'
import { json } from 'body-parser';
import { didMount } from './GuestNames1';
import { Button, Checkbox, Form, TextArea, Container, Divider, Header, Image, Icon } from 'semantic-ui-react'

class GuestBook extends Component {
  constructor(props) {
    super(props);
    this.handleSignatureOfGuest = this.handleSignatureOfGuest.bind(this);
    this.handleMessageofGuest = this.handleMessageofGuest.bind(this);
    this.state = {
      SignatureOfGuest: "",
      MessageofGuest: "",
    };
  }

  handleSignatureOfGuest(event) {
    this.setState({ SignatureOfGuest: event.target.value });
  }
  handleMessageofGuest(event) {
    this.setState({ MessageofGuest: event.target.value });
    // console.log('Messag event value--' + event);
    // console.log('handleMessageofGuest--' + event.target.value);

  }
  addToGuestBook = event => {
    event.preventDefault();
    console.log(this.state.SignatureOfGuest);
    console.log(this.state.MessageofGuest);

    axios.post('http://localhost:5000/api/Newsignatures', {
      SignatureOfGuest: this.state.SignatureOfGuest,
      MessageofGuest: this.state.MessageofGuest,
    })
      .then(response => {
        console.log(response, 'Signature added!');
      })
      .catch(err => {
        console.log(err, 'Signature not added, try again');
      });
    this.setState({
      SignatureOfGuest: "",
      MessageofGuest: "",
    });
  }

  render() {
    return (
      <div >
        <Container>
          <Header as='h2' textAlign='center' style={{ marginTop: '2%' }}>
            <Image src='download1.jpg' size="big" circular />
            <Header>Todo Application</Header>
          </Header>
          <Form>
            <Form.Field>
              <label>Your Name</label>
              <input onChange={this.handleSignatureOfGuest}
                name="SignatureOfGuest"
                value={this.state.SignatureOfGuest}
                placeholder="Enter your name" />
            </Form.Field>
            <Form.Field>
              <label>Your Message</label>
              <TextArea onChange={this.handleMessageofGuest}
                name="MessageofGuest"
                value={this.state.MessageofGuest}
                placeholder="Type a message" />
            </Form.Field>
            <div style={{ textAlign: 'center' ,marginBottom:"5%" }}>
              <Button type="submit"
                onClick={this.addToGuestBook} color="green" > Submit to Guestbook
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    )
  }

};


export default GuestBook;
