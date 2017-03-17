/**
 * Created by VBO3596 on 15/03/2017.
 */
import React from "react";
import {
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    TouchableHighlight,
    Button,
    Modal,
    Text
} from "react-native";
import EmailInput from './../components/emailInput';
import testUtil from './testUtil';
import strings from '../util/localizedStrings';

describe('Sign Up Form', () => {
    const navigateFunction = testUtil.createCheckCallFunction();
    const inputChangedFunction = testUtil.createCheckCallFunction();
    const submitFunction = testUtil.createCheckCallFunction();
    const signUpForm = testUtil.createSignUpForm(navigateFunction, inputChangedFunction, submitFunction);
    const buttons = testUtil.getComponentsOfTypeInContainer(signUpForm, Button);
    const inputFields = testUtil.getComponentsOfTypeInContainer(signUpForm, TextInput);

    it('Should display 1 ScrollView', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signUpForm, ScrollView)).to.have.length(1);
    });

    it('Should display 1 image for the logo', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signUpForm, Image)).to.have.length(1);
    });

    it('Should display 1 email input field.', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signUpForm, EmailInput)).to.have.length(1);
    });

    it('Should display 2 text input fields : 1 for password, 1 to confirm password.', () => {
        expect(inputFields).to.have.length(2);
    });

    it('Should display 1 TouchableHighLight to go to sign in', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signUpForm, TouchableHighlight)).to.have.length(1);
    });

    //To refacto
    //Navigation function is called
    // but the test FAILS because navigation implies "navigator.pop()" and navigator is not yet mocked.
    // it('Should navigate to sign in form when sign in link is pressed', () => {
    //     testUtil.press(signUpForm, "TouchableHighlight");
    // });

    //To refacto
    // it('should display 1 "account created" message', () => {
    //     const textZones = signUpForm.find(Text);
    //     const accountCreated = textZones.findWhere(n => n.props().children === strings.accountCreated);
    //     expect(accountCreated).to.have.length(1);
    //     expect(navigateFunction.wasCalled).to.equal(true);
    // }) ;

    it('Should display 2 Buttons: 1 for submit sign up, 1 "OK" in the modal', () => {
        expect(buttons).to.have.length(2);
    });

    it('Should display 1 button for sign up', () =>{
        const submitButton = buttons.findWhere(n => n.props().title === strings.signUp);
        expect(submitButton).to.have.length(1);
    });

    //To refacto
    // it('Should sign up when sign up button is pressed', () =>{
    //     const submitButton = buttons.findWhere(n => n.props().title === strings.signUp);
    //     testUtil.simulateActionOnSpecificComponent(submitButton, 'press');
    //     expect(submitFunction.wasCalled).to.equal(true);
    // });

    it('Should display 1 button "OK" in the modal', () =>{
        const okButton = buttons.findWhere(n => n.props().title === "OK");
        expect(okButton).to.have.length(1);
    });

    //To refacto
    //function is called
    // but the test FAILS because navigation implies "navigator.reset()" and navigator is not yet mocked.
    // it('Should close modal when "OK" button is pressed', () =>{
    //     const okButton = buttons.findWhere(n => n.props().title === "OK");
    //     testUtil.simulateActionOnSpecificComponent(okButton, 'press');
    //     const modalVisibilityAfterOkPressed = testUtil.getState(signUpForm).modalVisible;
    //     expect(modalVisibilityAfterOkPressed).to.be.false;
    // });

    it('Should display 1 Modal', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signUpForm, Modal)).to.have.length(1);
    });
});