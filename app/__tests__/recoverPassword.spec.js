/**
 * Created by VBO3596 on 15/03/2017.
 */
import React from "react";
import {
    Text,
} from "react-native";
import testUtil from './testUtil';

describe('RecoverPassword', () => {

    it('should display Recover Password Form', () => {
        const recoverPasswordForm = testUtil.createRecoverPasswordForm();
        expect(testUtil.getComponentsOfTypeInContainer(recoverPasswordForm, Text)).to.have.length(1);
        expect(testUtil.checkFieldValueIsConform(recoverPasswordForm, Text, "Recover password form")).to.be.true;
    });
});