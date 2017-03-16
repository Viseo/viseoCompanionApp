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

    it('should display the filters', () => {
       const filterBar = testUtil.createFilterBar();
       testUtil.checkComponentExists(filterBar, 'participation');
       testUtil.checkComponentExists(filterBar, 'important');
       testUtil.checkComponentExists(filterBar, 'optional');
       testUtil.checkComponentExists(filterBar, 'other');
    });

});