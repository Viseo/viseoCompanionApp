/**
 * Created by LMA3606 on 21/03/2017.
 */

import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import testUtil from './testUtil';

describe('AppText', () => {
    it('should diplay the test passed in his props', () => {
        const appText = testUtil.createAppText({
            className: "errorText",
            children: "Big big error",
        });
        testUtil.checkFieldContent(appText, "errorText", "Big big error")
    });
});