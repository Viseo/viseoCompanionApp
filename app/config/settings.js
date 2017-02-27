/**
 * Created by LMA3606 on 13/02/2017.
 */

// If you're running on another computer, make sure to put your own server ip address

///////////SERVER CONNECTION////////////////
// Localhost
// let SERVER_API_URL = 'http://localhost:8080/api/';

// AWS Dev server
let SERVER_API_URL = 'http://54.229.99.105:8080/viseocompanion/api/';

let ACCOUNT_API_URL = SERVER_API_URL + '/account/';
let EVENT_API_URL = SERVER_API_URL + '/event/';

const settings = {
    SERVER_API_URL,
    ACCOUNT_API_URL,
    EVENT_API_URL
};

export default settings;