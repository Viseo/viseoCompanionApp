/**
 * Created by AAB3605 on 10/03/2017.
 */
import React from "react";
import {shallow} from "enzyme";
import EventCard from './../components/eventCard';
import Filter from '../components/eventView/filter';
import FilterBar from '../components/eventView/filterBar';
import SearchBar from '../components/eventView/searchBar';
import RecoverPassword from './../scenes/recoverPassword';
import SignIn from './../scenes/signIn';
import SignUp from './../scenes/signUp';

function checkFieldContent(component, fieldName, fieldValue) {
    expect(component.find('.' + fieldName).props().children).to.equal(fieldValue);
}

function checkComponentExists(component, className) {
    expect(component.find('.' + className)).to.have.length(1);
}

function checkFieldValueIsConform(container, field, fieldValue) {
    return container.find(field).props().children === fieldValue;
}

function getComponentsOfTypeInContainer(container, componentType){
    return container.find(componentType);
}

function click(component, widget) {
    component.find(widget).simulate('click');
}

function press(component, widget) {
    component.find(widget).simulate('press');
}

function changeText(component, widget) {
    component.find(widget).simulate('keydown', { which: 'a' });
}

function createEventCard(props) {
    return shallow(<EventCard {...props}/>);
}

function simulateActionOnSpecificComponent(component, action){
    component.simulate(action);
}

function createFilter(props) {
    return shallow(<Filter {...props} />);
}

function createFilterBar(props) {
    return shallow(<FilterBar {...props} />);
}

function createSearchBar(props) {
    return shallow(<SearchBar {...props} />);
}

function createRecoverPasswordForm() {
    return shallow(<RecoverPassword/>);
}

function callMethod(component, methodName, args) {
    return component[methodName](...args);
}

function checkCall(checkCallFunction) {
    return expect(checkCallFunction.wasCalled).to.equal(true);
}

function createSignInForm(
    onSubmit = () => {},
    onNavigate = () => {},
    onRememberMe = () => {},
    onSubmitInput = () => {}) {
    return shallow(<SignIn
        onSubmit={onSubmit}
        onNavigate={onNavigate}
        onRememberMe={onRememberMe}
        onSubmitInput={onSubmitInput}/>);
}

function createSignUpForm(
    onNavigate = () => {},
    onInputChanged = ()=> {},
    onSubmit = () => {}) {
    return shallow(<SignUp
        onNavigate={onNavigate}
        onEmailInputChanged={onInputChanged}
        onSubmit={onSubmit}
    />);
}

function getState(component) {
    return component.state();
}

function getProps(component) {
    return component.instance().props;
}

function createCheckCallFunction() {
    function checkCallFunction() {
        checkCallFunction.wasCalled = true;
    };
    return checkCallFunction;
}

function compare(value, expectedValue) {
    return expect(expectedValue).to.equal(value);
}

export default testUtil = {
    checkFieldContent,
    click,
    press,
    createEventCard,
    createFilter,
    createFilterBar,
    getState,
    getProps,
    createCheckCallFunction,
    checkComponentExists,
    createRecoverPasswordForm,
    getComponentsOfTypeInContainer,
    checkFieldValueIsConform,
    createSignInForm,
    simulateActionOnSpecificComponent,
    createSignUpForm,
    createSearchBar,
    callMethod,
    compare,
    changeText,
    checkCall
};