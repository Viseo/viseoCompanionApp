/**
 * Created by AAB3605 on 10/03/2017.
 */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { shallow } from "enzyme";
import EventCard from './../components/eventCard';
import Event from './../util/event';
import testUtil from './testUtil';

describe('Event card', () => {

    let event = new Event(0, 'the beautiful event', 'the description of my awesome event', '1/1/2017', 'it happens here');


    it('should display an event card', () => {
        const eventCard = testUtil.createEventCard(event);
        testUtil.checkFieldContent(eventCard, 'name', event.name);
        testUtil.checkFieldContent(eventCard, 'description', event.description);
    });

    describe('logged User', () => {

        it('should be able to participate or not', () => {
            function toggleParticipation () {
                toggleParticipation.participating = true;
            }
            const eventCard = testUtil.createEventCard(event, toggleParticipation);
            testUtil.click(eventCard, 'participate');
            expect(toggleParticipation.participating).to.equal(true);
        });

        it('should be able to leave a comment', () => {
            const wrapper = shallow(<EventCard data={event}/>);
            expect(wrapper.find('Text.comment')).to.have.length(1);
        });

        it('should be able to ask the organizer a question', () => {
            const wrapper = shallow(<EventCard data={event}/>);
            expect(wrapper.find('Text.question')).to.have.length(1);
        });

        // it('should log', function() {
        //     const logPage = mount('component');
        //     testUtil.checkFieldContent(logPage, 'login', '');
        //     testUtil.checkFieldContent(logPage, 'password', '');
        //     testUtil.enter(logPage, 'login', 'bad login');
        //     testUtil.click(logPage, 'loginButton');
        //     testUtil.checkFieldContent(logPage, 'error');
        // });

    });
});