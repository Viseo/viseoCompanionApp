import * as types from './actions.actions';
import moment from 'moment';

function formatAction(action) {

    return {
        id: parseInt(action.id),
        version: parseInt(action.version),
        category: 0,
        name: action.title,
        datetime: moment(action.dateStart, 'YYYY-MM-DD hh:mm').unix() * 1000 + 7200000,
        description: action.description,
        keyWords: '',
        location: action.address,
        imageUrl: '',
        participants: [],
        host: {
            id: parseInt(action.userId),
            version: 0,
            email: 'aziz@viseo.com',
            firstName: 'Aziz',
            lastName: 'Ben Miled',
            imageUrl: '',
            roles: [],
        },
        keywords: [],
    };

}

const actions = (state = {
    items: [],
}, action) => {
    switch (action.type) {
        case types.ADD_ACTIONS:
            return {
                ...state,
                items: action.actions.map(action => formatAction(action)),
            };
        default:
            return state;
    }
};
export default actions;