/**
 * Created by AAB3605 on 15/03/2017.
 */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import testUtil from '../testUtil';

describe('FilterBar', () => {

    it('should display four filters: important, optional, other, participation', () => {
        const participation = testUtil.createCheckCallFunction();
        const important = testUtil.createCheckCallFunction();
        const optional = testUtil.createCheckCallFunction();
        const other = testUtil.createCheckCallFunction();
        const filterBar = testUtil.createFilterBar({
            participation,
            important,
            optional,
            other
        });
        testUtil.checkMethodPassedByProp(filterBar, 'participation', 'onFilter', participation);
        testUtil.checkMethodPassedByProp(filterBar, 'important', 'onFilter', important);
        testUtil.checkMethodPassedByProp(filterBar, 'optional', 'onFilter', optional);
        testUtil.checkMethodPassedByProp(filterBar, 'other', 'onFilter', other);
    });

});