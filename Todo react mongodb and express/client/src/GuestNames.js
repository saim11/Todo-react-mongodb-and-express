import React, { Component } from 'react';
class GuestNames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }
    componentDidMount() {
        let fetch =fetch('http://localhost:5000/api/signatures').then(results => {
            return results.json();
       
        })
    }


    render() {
        fetch.then((msg) => {
            // console.log(msg[0]);
            msg.map((item, index) => {

                return (
                    console.log(item.message),
                    <div key={index}>
                        <h3>{item.message}</h3>
                        <h2>{item.guestSignature}</h2>
                    </div> ,
                    this.setState({ messages: item.message })
                )
            })

        })
        // return (
        //     <div className="guestdataContainer" >
        //         <h2>Guestbook Messages</h2>
        //         <li>{this.state.messages}</li>
        //     </div>
        // )
    }
}

export default GuestNames;