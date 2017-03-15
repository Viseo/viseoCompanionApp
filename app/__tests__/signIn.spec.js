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
    Button
} from "react-native";
import CheckBox from 'react-native-check-box';
import testUtil from './testUtil';
import strings from '../util/localizedStrings';

describe('Sign In Form', () => {
    const signInSubmitFunction = testUtil.createCheckCallFunction();
    const navigateFunction = testUtil.createCheckCallFunction();
    const rememberMeFunction = testUtil.createCheckCallFunction();
    const submitInputFunction = testUtil.createCheckCallFunction();
    const signInForm = testUtil.createSignInForm(signInSubmitFunction, navigateFunction, rememberMeFunction, submitInputFunction);
    const links = testUtil.getComponentsOfTypeInContainer(signInForm, TouchableHighlight);
    const inputFields = testUtil.getComponentsOfTypeInContainer(signInForm, TextInput);

    it('Should display 1 ScrollView', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signInForm, ScrollView)).to.have.length(1);
    });

    it('Should display 1 image for the logo', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signInForm, Image)).to.have.length(1);
    });

    it('Should display 2 text input fields : 1 for email 1 for password.', () => {
        expect(inputFields).to.have.length(2);
    });

    //SubmitEdition functions are called
    // but the test FAILS because their execution implies a reference on the actual component.
    it('should submitInput when edition end', () => {
        inputFields.forEach( n => testUtil.simulateActionOnSpecificComponent(n, 'submitEditing'));
        expect(submitInputFunction.wasCalled).to.equal(true);
    });

    it('Should display 1 checkbox field for "remember me".', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signInForm, CheckBox)).to.have.length(1);
    });

    it('should change "remember user" state when the CheckBox is clicked', () => {
        const rememberStateBeforePress = testUtil.getState(signInForm).rememberUser;
        testUtil.click(signInForm, 'CheckBox');
        const rememberStateAfterPress = testUtil.getState(signInForm).rememberUser;
        expect(rememberStateAfterPress).to.equal(!rememberStateBeforePress);
    });

    it('Should display 2 TouchableHighLights : 1 for "forgot password", 1 for "create account".', () => {
        expect(links).to.have.length(2);
    });

    it('should display 1 sign up link', () => {
        const gotToSIgnUpLink = links
            .findWhere(n => n.props().children === strings.createAccountLink);
        expect(gotToSIgnUpLink).to.have.length(1);
    }) ;

    it('should display 1 recover password link', () => {
        const gotToSIgnUpLink = links
            .findWhere(n => n.props().children === strings.forgotPassword);
        expect(gotToSIgnUpLink).to.have.length(1);
    }) ;

    //Navigation functions are called
    // but the test FAILS because navigation implies "navigator.push()" and navigator is not yet mocked.
    it('should navigate when a link is pressed', () => {
        links.forEach( n => testUtil.simulateActionOnSpecificComponent(n, 'press'));
        expect(navigateFunction.wasCalled).to.equal(true);
    });

    it('Should display 1 Button for submit', () => {
        expect(testUtil.getComponentsOfTypeInContainer(signInForm, Button)).to.have.length(1);
    });

    it('should be submitted when submit button is pressed', () => {
        testUtil.press(signInForm, 'Button');
        expect(signInSubmitFunction.wasCalled).to.equal(true);
    }) ;
});