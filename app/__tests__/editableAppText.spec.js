/**
 * Created by VBO3596 on 05/04/2017.
 */
import React from "react";
import {
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import testUtil from './testUtil';
import AppText from './../components/appText';

describe('Editable App Text', () => {
    let content = "my editable content"
    const validationFunction = testUtil.createCheckCallFunction();
    const notEditableText = testUtil.createEditableAppText({content: content, onValidate: validationFunction});
    const editableText = testUtil.createEditableAppText({editable:true, content: content, onValidate: validationFunction});

    it('Should not be editable by default.', () => {
        let editableBeforePress = testUtil.getState(notEditableText).editable;
        expect(editableBeforePress).to.equal.false;
    });

    it('Should display 1 text by default and 1 edit icon.', () => {
        expect(testUtil.getComponentsOfTypeInContainer(notEditableText, AppText)).to.have.length(1);
        expect(testUtil.getComponentsOfTypeInContainer(notEditableText, TouchableOpacity)).to.have.length(1);
        expect(testUtil.getComponentsOfTypeInContainer(notEditableText, Image)).to.have.length(1);
        testUtil.checkChildComponentWithPropValue(notEditableText, AppText, 'children', content);
    });

    it('Should become editable after edit icon was pressed.', () => {
        testUtil.press(notEditableText, 'TouchableOpacity');
        let editableAfterPress = testUtil.getState(notEditableText).editable;
        expect(editableAfterPress).to.equal.true;
    });

    it('Should display 1 text input and 1 cancel icon if editable.', () => {
        expect(testUtil.getComponentsOfTypeInContainer(editableText, TextInput)).to.have.length(1);
        expect(testUtil.getComponentsOfTypeInContainer(editableText, TouchableOpacity)).to.have.length(1);
        expect(testUtil.getComponentsOfTypeInContainer(editableText, Image)).to.have.length(1);
    });

    it('Should edit value when text change', () =>{
        let newContent = "my edited content";
        testUtil.changeTextWithInputValue(editableText, newContent);
        const textAfterInput = testUtil.getState(editableText).text;
        expect(textAfterInput.target.value).to.equal(newContent);
    });

    it('Should call validation function when text input is submitted', () =>{
        testUtil.submitText(editableText);
        testUtil.checkCall(validationFunction);
    });
});