/**
 * Created by AAB3605 on 10/03/2017.
 */
import React from "react";
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import {shallow} from "enzyme";
import EventCard from '../components/events/eventCard';
import Filter from '../components/events/filter';
import FilterBar from '../components/events/filterBar';
import SearchBar from '../components/events/searchBar';
import RecoverPassword from './../scenes/recoverPassword';
import SignIn from './../scenes/signIn';
import SignUp from './../scenes/signUp';
import AppText from '../components/appText';
import EditableAppText from '../components/editableAppText';
import EventViewHeader from '../components/events/header';
import EmailInput from './../components/emailInput';
import PasswordInput from './../components/passwordInput';
import Home from './../scenes/home';
import EventDetails from '../components/events/eventDetails';
import DatePicker from "react-native-datepicker";

function checkChildComponentWithPropValue(parent, child, prop, value) {
    expect(parent.findWhere(n => {
        return n.type() === child
            && n.props()[prop] === value;
    })).to.have.length(1);
}

function getSpecificComponentWIthPropValue(parent,child,prop,value){
    return parent.findWhere(n => {
        return n.type() === child
            && n.props()[prop] === value;
    });
}

function checkFieldContent(component, fieldName, fieldValue) {
    expect(component.find('.' + fieldName).props().children).to.equal(fieldValue);
}

function checkComponentExists(component, className) {
    expect(component.find('.' + className)).to.have.length(1);
}

function checkChildComponentExists(parent, child, occurrences = 1) {
    let c = parent.find(child);
    expect(parent.find(child)).to.have.length(occurrences);
}

function getChildComponent(parent, className) {
    return parent.find('.' + className);
}

function executeProp(component, propName) {
    component.props()[propName]();
}

function checkMethodPassedByProp(parentComponent, className, propName, method) {
    checkComponentExists(parentComponent, className);
    executeProp(getChildComponent(parentComponent, className), propName);
    checkCall(method);
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

function press(component) {
    component.simulate('press');
}

function changeText(component) {
    const textInput = component.find(TextInput).first();
    textInput.simulate('changeText');
}

function submitText(component) {
    const textInput = component.find(TextInput).first();
    textInput.simulate('submitEditing');
}

function changeTextWithInputValue(component, inputValue) {
    const textInput = component.find(TextInput).first();
    textInput.simulate('changeText', { target: {value: inputValue} });
}

function validateEditableAppTextWithInputValue(editableAppText, inputValue) {
    editableAppText.simulate('validate', { target: {value: inputValue} });
}

function changeDateWithValue(component, pickedDate) {
    const datePicker = component.find(DatePicker).first();
    datePicker.simulate('changeDate', {target: {date: pickedDate}});
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

function createHome(props) {
    return shallow(<Home {...props} />);
}

function createEventViewHeader(props) {
    return shallow(<EventViewHeader {...props} />);
}

function createSearchBar(props) {
    return shallow(<SearchBar {...props} />);
}

function createRecoverPasswordForm() {
    return shallow(<RecoverPassword/>);
}

function createEmailInput() {
    return shallow(<EmailInput/>);
}

function createPasswordInput() {
    return shallow(<PasswordInput/>);
}

function callMethod(component, methodName, args) {
    return component.instance()[methodName](...args);
}

function checkCall(checkCallFunction) {
    return expect(checkCallFunction.wasCalled).to.equal(true);
}

function createSignInForm() {
    return shallow(<SignIn/>);
}

function createSignUpForm() {
    return shallow(<SignUp/>);
}

function createEventDetails(props) {
    return shallow(<EventDetails {...props}/>);
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
    return expect(value).to.deep.equal(expectedValue);
}

function createAppText(props) {
    return shallow(<AppText {...props} />)
}

function createEditableAppText(props) {
    return shallow(<EditableAppText {...props} />);
}

export default testUtil = {
    checkChildComponentWithPropValue,
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
    getChildComponent,
    checkMethodPassedByProp,
    createEventViewHeader,
    checkChildComponentExists,
    createEmailInput,
    changeTextWithInputValue,
    createPasswordInput,
    createHome,
    checkCall,
    createAppText,
    createEventDetails,
    createEditableAppText,
    submitText,
    validateEditableAppTextWithInputValue,
    getSpecificComponentWIthPropValue,
    changeDateWithValue
};