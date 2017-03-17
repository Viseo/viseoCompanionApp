/**
 * Created by VBO3596 on 17/03/2017.
 */
import React from "react";
import {
    TextInput
} from "react-native";
import testUtil from './testUtil';

describe('Email input', () => {
    const myEmail = "myName@mail.com";
    const emailInput = testUtil.createEmailInput();
    it('Should display 1 input field.', () => {
        expect(testUtil.getComponentsOfTypeInContainer(emailInput, TextInput)).to.have.length(1);
    });

    it('Should edit email when text change', () =>{
        testUtil.changeTextWithInputValue(emailInput, myEmail);
        const emailAfterInput = testUtil.getState(emailInput).email;
        expect(emailAfterInput.target.value).to.equal(myEmail);
    });
});