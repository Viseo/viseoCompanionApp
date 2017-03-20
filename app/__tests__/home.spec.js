/**
 * Created by LMA3606 on 27/02/2017.
 */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import testUtil from './testUtil';

describe("Home", () => {

    it('Should display a list of events', () => {
        const home = testUtil.createHome();
        testUtil.checkChildComponentExists(home, 'ListView');
    });

});