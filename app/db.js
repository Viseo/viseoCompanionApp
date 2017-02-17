/**
 * Created by AAB3605 on 16/02/2017.
 */
import settings from './config/settings';

export async function addUser(email, password) {
    try {
        let response = await fetch(settings.SERVER_API_URL + 'account/addAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

        let responseJson = await response.json();
        if(responseJson) {
            return true;
        }
    } catch (error) {
        console.warn(error);
    }

    return false;
}

export async function checkCredentials(email, password) {
    try {
        let response = await fetch(settings.SERVER_API_URL + 'account/Authentification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

        let responseJson = await response.json();
        if(responseJson) {
            return true;
        }
    } catch (error) {
        console.warn(error);
    }

    return false;
}

export async function hasUser(email) {
    try {
        let response = await fetch(settings.SERVER_API_URL + 'account/checkAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
            })
        });

        let responseJson = await response.json();
        if(responseJson) {
            return false;
        }
    } catch (error) {
        console.warn(error);
    }

    return true;
}
