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

describe('Filter', () => {

    it('should apply or remove the filter when selected or unselected', () => {
        const filterFunction = testUtil.createCheckCallFunction();
        const filter = testUtil.createFilter({
            onFilter: filterFunction
        });
        let selectedBeforePress = testUtil.getState(filter).selected;
        testUtil.press(filter, 'TouchableOpacity');
        let selectedAfterPress = testUtil.getState(filter).selected;
        expect(selectedAfterPress).to.equal(!selectedBeforePress);
        testUtil.checkCall(filterFunction);
    });

});