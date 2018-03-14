import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GuestBook from './App';
import GuestNames, { Hello } from './GuestNames1';

import { didMount } from './GuestNames1';
// var GuestNames = require('./GuestNames1');
import registerServiceWorker from './registerServiceWorker';


import { Button } from 'semantic-ui-react'

// const ButtonExampleButton = () => (
//     <Button primary> Click Here</Button>
// )

// export default ButtonExampleButton


ReactDOM.render(
    // console.log(Hello)
    <div>
        {/* <ButtonExampleButton /> */}
        <GuestBook />
        <GuestNames />
        
        {/* <Hello /> */}
        {/* {console.log(hello('saim'))} */}


    </div>,
    document.getElementById('root'));
registerServiceWorker();
