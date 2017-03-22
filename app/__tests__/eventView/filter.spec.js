/**
 * Created by AAB3605 on 14/03/2017.
 */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import testUtil from '../testUtil';
import testComponents from '../testComponents';

describe('Filter', () => {

    it('should apply or remove the filter when selected or unselected', () => {
        const filterFunction = testUtil.createCheckCallFunction();
        const filter = testComponents.get('Filter', {
            dataSource: [],
            onFilter: filterFunction
        });
        let selectedBeforePress = testUtil.getState(filter).selected;
        testUtil.press(filter, 'TouchableOpacity');
        let selectedAfterPress = testUtil.getState(filter).selected;
        testUtil.compare(selectedAfterPress, !selectedBeforePress);
        testUtil.checkCall(filterFunction);
    });

    it('should filter the data according to the passed conditions', () => {
        const dataToFilter = [
            {a:'a', b:'b', c:''},
            {a:'b', b:'b', c:''},
            {e:'a', b:'b', c:''},
        ];
        const retainCondition = {
            property: 'a',
            value: 'a'
        };
        const expectedFilteredData = [
            {a:'a', b:'b', c:''}
        ];
        let filteredData = [];
        let onFilter = result => {
            filteredData = result;
        }
        const filter = testComponents.get('Filter', {
            dataSource: dataToFilter,
            filter: retainCondition,
            onFilter
        });
        testUtil.press(filter, 'TouchableOpacity');
        testUtil.compare(filteredData, expectedFilteredData);
    });

});