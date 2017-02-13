/**
 * Created by LMA3606 on 13/02/2017.
 */

// If you're running on another computer, make sure to put your own server ip address

let SERVER_API_URL = 'http://10.33.179.8:8080/api/';

let ACCOUNT_API_URL = SERVER_API_URL + '/account/';
let EVENT_API_URL = SERVER_API_URL + '/event/';

const settings = {
    ACCOUNT_API_URL,
    EVENT_API_URL
};

export default settings;