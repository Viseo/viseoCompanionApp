/**
 * Created by VBO3596 on 17/03/2017.
 */
import React from "react";
import {
    TextInput
} from "react-native";
import testUtil from './testUtil';

describe('Password input', () => {
    const myPassword = "myPassword";
    const passwordInput = testUtil.createPasswordInput();
    it('Should display 1 input field.', () => {
        expect(testUtil.getComponentsOfTypeInContainer(passwordInput, TextInput)).to.have.length(1);
    });

    it('Should edit password when text change', () =>{
        testUtil.changeTextWithInputValue(passwordInput, myPassword);
        const passwordAfterInput = testUtil.getState(passwordInput).email;
        expect(passwordAfterInput.target.value).to.equal(myPassword);
    });
});