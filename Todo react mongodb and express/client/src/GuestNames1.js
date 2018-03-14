import React, { Component } from 'react';
import axios from 'axios'
import { Item, Button, Header, Divider } from 'semantic-ui-react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

var divStyle = {
    borderBottom: '22px groove lightBlue',
    padding: '2%',
    backgroundColor: 'lightBlue',


};

export class Hello extends Component {

    render() {
        return (
            <h2> hello Component is clicked </h2>
        )
    }
}




export function hello(name) {
    return (name + ' is a good boy');
}

class GuestNames extends Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            messages: [],
        };
        console.log("Babooooo " + this.props.state);
    }
    // =================Edit Item from Database=============//
    edit = (event) => {
        let value = event.target.id;
        let data = fetch('http://localhost:5000/api/signatures')
            .then(
            results => results.json()
            );
        data.then(
            (msg) => {
                console.log(msg);
                msg.map((item, index) => {
                    if (item._id === value) {
                        var updatedMessage = prompt("Update Your Post ", item.message);
                        console.log(item.guestSignature);
                        if (updatedMessage !== null) {
                            alert("Your Updated value is ..\n" + updatedMessage);
                            axios.put(`http://localhost:5000/api/signatures/${item._id}`, {
                                SignatureOfGuest: item.guestSignature,
                                MessageofGuest: updatedMessage,
                            })
                                .then((response) => {
                                    console.log("Data has been edited now ..!!");
                                })
                                .catch((err) => {
                                    console.log("Error is :" + err);
                                })
                        }
                    }
                })
            })
    }
    // ===================================================================//
    // =================Delete Item from Database=========================//
    delete = event => {
        let value = event.target.id;
        let data = fetch('http://localhost:5000/api/signatures')
            .then(
            results => results.json()
            );
        data.then(
            (msg) => {
                console.log(msg);
                msg.map((item, index) => {
                    if (item._id === value) {
                        alert("Do you want to delete this post??");
                        axios.delete(`http://localhost:5000/api/signatures/${item._id}`)
                            .then((response) => {
                                console.log("Data has been Delete..!! ", response);
                            })
                            .catch((err) => {
                                console.log("Error is :" + err);
                            })
                    }
                })
            })

    }


    componentDidMount() {
        let fetchData = () => {
            let data = fetch('http://localhost:5000/api/signatures')
                .then(
                results => results.json()
                );

            data.then((msg) => {

                this.setState({ messages: msg });
            })

        }
        setInterval(fetchData, 100);
    }



    render() {

        let msg = this.state.messages;
        return (
            <div className="guestdataContainer"  >
                <Container>
                    <Segment inverted>
                        <Divider inverted />
                        <Divider inverted></Divider>
                    </Segment>
                    <Header attached='top' size='huge' style={{ textAlign: 'center', backgroundColor: "lightBlue", margin: "0% 0% 2% 0%", padding: '5%' }}>All Posts</Header>

                    {
                        msg.map((item, i) => {
                            return (
                                <div key={i}>
                                    <Item.Group style={divStyle}>
                                        <Segment.Group>
                                            <Segment attached>
                                                <Item>
                                                    <Item.Content>
                                                        <Item.Header as='a'>{`${item.guestSignature} has posted :`}</Item.Header>
                                                        <Item.Description>
                                                            <p>{`${item.message} `}</p>
                                                            <Button id={item._id} ref={i} onClick={this.edit} color="green">Edit</Button>
                                                            <Button id={item._id} ref={i} onClick={this.delete} color="red">Delete</Button>
                                                        </Item.Description>
                                                    </Item.Content>
                                                </Item>
                                            </Segment>
                                        </Segment.Group>
                                    </Item.Group>

                                </div>
                            )
                        })
                    }
                    {/* <h3>{this.state.messages}</h3> */}
                </Container>
            </div>
        )
    }
}



export default GuestNames;


