import {serverURL} from './../global/settings';

let ws = new WebSocket('ws://' + serverURL + 'liveEvent');
console.log('bla');
console.warn('bla');

ws.onopen = () => {
    // connection opened

    ws.send('something'); // send a message
};

ws.onmessage = (e) => {
    // a message was received
    console.log(e.data);
};

ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
};

ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
};

export default ws;