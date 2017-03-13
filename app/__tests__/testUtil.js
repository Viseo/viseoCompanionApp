/**
 * Created by AAB3605 on 10/03/2017.
 */
import React from "react";
import {shallow} from "enzyme";
import EventCard from './../components/eventCard';


function checkFieldContent(component, fieldName, fieldValue) {
    expect(component.find('.' + fieldName).props().children).to.equal(fieldValue);
}

function click(component, widget) {
    component.find('.' + widget).simulate('click');
}

function createEventCard(event, participating = () => {}) {
    return shallow(<EventCard data={event} toggleParticipation={participating}/>);
}

export default testUtil = {
    checkFieldContent,
    click,
    createEventCard
};