/**
 * Created by AAB3605 on 05/04/2017.
 */

export const setWords = (searchString) => ({
    type: 'SET_WORDS',
    searchWords: searchString.split(' ')
})