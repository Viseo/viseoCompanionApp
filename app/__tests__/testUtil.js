/**
 * Created by AAB3605 on 10/03/2017.
 */
import React from "react";
import {shallow} from "enzyme";
import EventCard from './../components/eventCard';
import Filter from './../components/filter';

function checkFieldContent(component, fieldName, fieldValue) {
    expect(component.find('.' + fieldName).props().children).to.equal(fieldValue);
}

function click(component, widget) {
    component.find(widget).simulate('click');
}

function press(component, widget) {
    component.find(widget).simulate('press');
}

function createEventCard(event, toggleParticipation = () => {}) {
    return shallow(<EventCard data={event} toggleParticipation={toggleParticipation}/>);
}

function createFilter(onFilter = () => {}) {
    return shallow(<Filter onFilter={onFilter}/>);
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
    createCheckCallFunction
};