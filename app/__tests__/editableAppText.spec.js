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
    const editableTextInModificationMode = testUtil.createEditableAppText({
        isInModificationMode:true, editable:true, content: content, onValidate: validationFunction});
    const defaultEditableAppTextInModificationMode = testUtil.createEditableAppText({
        isInModificationMode:true, content: content, onValidate: validationFunction});
    const defaultEditableAppText = testUtil.createEditableAppText({
        content: content, onValidate: validationFunction});

    it('Should not be in modification mode by default.', () => {
        let defaultModificationMode = testUtil.getState(defaultEditableAppText).isInModificationMode;
        expect(defaultModificationMode).to.equal.false;
    });

    it('Should display 1 text by default.', () => {
        expect(testUtil.getComponentsOfTypeInContainer(defaultEditableAppText, AppText)).to.have.length(1);
    });

    it('Should not be editable by default.', () => {
        let editableBeforePress = testUtil.getState(defaultEditableAppTextInModificationMode).editable;
        expect(editableBeforePress).to.equal.false;
    });

    it('Should display 1 text by default and 1 edit icon.', () => {
        expect(testUtil.getComponentsOfTypeInContainer(defaultEditableAppTextInModificationMode, AppText)).to.have.length(1);
        expect(testUtil.getComponentsOfTypeInContainer(defaultEditableAppTextInModificationMode, TouchableOpacity)).to.have.length(1);
        expect(testUtil.getComponentsOfTypeInContainer(defaultEditableAppTextInModificationMode, Image)).to.have.length(1);
        testUtil.checkChildComponentWithPropValue(defaultEditableAppTextInModificationMode, AppText, 'children', content);
    });

    it('Should become editable after edit icon was pressed.', () => {
        testUtil.press(defaultEditableAppTextInModificationMode, 'TouchableOpacity');
        let editableAfterPress = testUtil.getState(defaultEditableAppTextInModificationMode).editable;
        expect(editableAfterPress).to.equal.true;
    });

    it('Should display 1 text input and 1 cancel icon if editable.', () => {
        expect(testUtil.getComponentsOfTypeInContainer(editableTextInModificationMode, TextInput)).to.have.length(1);
        expect(testUtil.getComponentsOfTypeInContainer(editableTextInModificationMode, TouchableOpacity)).to.have.length(1);
        expect(testUtil.getComponentsOfTypeInContainer(editableTextInModificationMode, Image)).to.have.length(1);
    });

    it('Should edit value when text change', () =>{
        let newContent = "my edited content";
        testUtil.changeTextWithInputValue(editableTextInModificationMode, newContent);
        const textAfterInput = testUtil.getState(editableTextInModificationMode).text;
        expect(textAfterInput.target.value).to.equal(newContent);
    });

    it('Should call validation function when text input is submitted', () =>{
        testUtil.submitText(editableTextInModificationMode);
        testUtil.checkCall(validationFunction);
    });
});