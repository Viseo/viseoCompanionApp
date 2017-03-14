/**
 * Created by AAB3605 on 14/03/2017.
 */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import testUtil from './testUtil';

describe('Filter', () => {

    it('should become selected or unselected when pressed', () => {
        const filter = testUtil.createFilter();
        const selectedStateBeforePress = testUtil.getState(filter).selected;
        testUtil.press(filter, 'TouchableOpacity');
        const selectedStateAfterPress = testUtil.getState(filter).selected;
        expect(selectedStateAfterPress).to.equal(!selectedStateBeforePress);
    });

    it('should apply or remove the filter when selected or unselected', () => {
        const filterFunction = testUtil.createCheckCallFunction();
        const filter = testUtil.createFilter(filterFunction);
        testUtil.press(filter, 'TouchableOpacity');
        expect(filterFunction.wasCalled).to.equal(true);
    }) ;

});