export const SET_WORDS = 'SET_WORDS';
export const setWords = (searchString = []) => ({
    type: SET_WORDS,
    searchWords: searchString.length > 0 ?
        searchString
            .trim()
            .replace(/\s+/g, ' ')
            .split(' ')
        : [],
});