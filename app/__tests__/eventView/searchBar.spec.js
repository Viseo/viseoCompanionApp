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
            dataSource: [],
            onSearch
        });
        testUtil.changeText(searchBar);
        testUtil.checkCall(onSearch);
    });

    it('should return the matching data given a set of data and a search string ', () => {
        const dataSource = [
            {a: 'a', b: 'b', c: 'c'},
            {d: 'd', e: 'e', f: 'f'},
        ];
        const searchBar = testUtil.createSearchBar({
            dataSource,
            onSearch: () => {}
        });
        let searchString = 'a';
        let expectedResult = [];
        expectedResult.push(dataSource[0]);
        let result = testUtil.callMethod(searchBar, 'findMatchingData', searchString);
        testUtil.compare(result,expectedResult);
    });

});