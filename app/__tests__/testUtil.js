/**
 * Created by AAB3605 on 10/03/2017.
 */
import React from "react";
import {shallow} from "enzyme";
import EventCard from './../components/eventCard';
import Filter from './../components/filter';
import RecoverPassword from './../scenes/recoverPassword';
import SignIn from './../scenes/signIn';
import SignUp from './../scenes/signUp';

function checkFieldContent(component, fieldName, fieldValue) {
    expect(component.find('.' + fieldName).props().children).to.equal(fieldValue);
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

function simulateActionOnSpecificComponent(component, action){
    component.simulate(action);
}

function createEventCard(event, toggleParticipation = () => {}) {
    return shallow(<EventCard data={event} toggleParticipation={toggleParticipation}/>);
}

function createFilter(onFilter = () => {}) {
    return shallow(<Filter onFilter={onFilter}/>);
}

function createRecoverPasswordForm() {
    return shallow(<RecoverPassword/>);
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

function createCheckCallFunction() {
    function checkCallFunction() {
        checkCallFunction.wasCalled = true;
    };
    return checkCallFunction;
}

export default testUtil = {
    checkFieldContent,
    click,
    press,
    createEventCard,
    createFilter,
    getState,
    createCheckCallFunction,
    createRecoverPasswordForm,
    getComponentsOfTypeInContainer,
    checkFieldValueIsConform,
    createSignInForm,
    simulateActionOnSpecificComponent,
    createSignUpForm

};