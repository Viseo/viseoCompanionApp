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
            id: parseInt(action.user.id),
            version: 0,
            email: action.user.email,
            firstName: action.user.firstName,
            lastName: action.user.lastName,
            imageUrl: '',
            roles: [],
        },
        keywords: [],
    };

}

const actions = (state = {
    items: [],
    myItems: [],
}, action) => {
    switch (action.type) {
        case types.ADD_ACTIONS:
            return {
                ...state,
                items: action.actions.map(action => formatAction(action)),
                myItems: action.actions,
            };
        default:
            return state;
    }
};
export default actions;