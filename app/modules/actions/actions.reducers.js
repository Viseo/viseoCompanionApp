import * as types from './actions.actions';

function formatAction(action) {
    return {
        id: parseInt(action.id),
        version: parseInt(action.version),
        category: 0,
        name: action.title,
        datetime: parseInt('1514764800000'),
        description: action.description,
        keyWords: '',
        location: action.address,
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
    };

}

const actions = (state = {
    items: [],
}, action) => {
    switch (action.type) {
        case types.ADD_ACTIONS:
            return {
                ...state,
                items: action.actions.map(action => {
                    formatAction(action);
                }),
            };
        default:
            return state;
    }
};
export default actions;