/**
 * Created by AAB3605 on 16/03/2017.
 */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import testUtil from '../testUtil';

describe('SearchBar', () => {

    it('should display a search bar', () => {
        const searchBar = testUtil.createSearchBar();
        testUtil.checkComponentExists(searchBar, 'searchBar');
    });

    it('should search from the given data whenever the search bar is edited', () => {
        const onSearch = testUtil.createCheckCallFunction();
        const searchBar = testUtil.createSearchBar({
            onSearch
        });
        testUtil.changeText(searchBar);
        testUtil.checkCall(onSearch);
    });

    it('should return the matching data given a set of data and a search string ', () => {
        const dataToSearchFrom = [
            {a: 'a', b: 'b', c: 'c'},
            {d: 'd', e: 'e', f: 'f'},
        ];
        const searchBar = testUtil.createSearchBar();
        let searchString = 'a';
        let expectedResult = dataToSearchFrom[0];
        let result = testUtil.callMethod(searchBar, 'search', {
            dataToSearchFrom,
            searchString
        });
        testUtil.compare(result,expectedResult);
    });

});