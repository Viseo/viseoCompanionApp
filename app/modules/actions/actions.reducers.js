function formatAction(action) {
    return {
        ...action,
        id: parseInt(action.id),
        version: parseInt(action.version),
        minGain: parseInt(action.minGain),
        maxGain: parseInt(action.maxGain),
    };
}

const actions = (state = {
    items: [],
}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};