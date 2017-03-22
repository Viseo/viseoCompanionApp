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
import EventCard from '../../components/events/eventCard';
import Event from '../../util/event';
import testUtil from '../testUtil';

describe('Event card', () => {

    it('should display an event card', () => {
        let event = new Event(0, 'the beautiful event', 'the description of my awesome event', '2013-03-07T07:00:00+08:00', 'it happens here');
        const eventCard = testUtil.createEventCard({
            title: event.name,
            description: event.description,
            location: event.location,
            date: event.getDateToString(),
            onParticipationChange: () => {}
        });
        testUtil.checkFieldContent(eventCard, 'name', event.name);
        testUtil.checkFieldContent(eventCard, 'description', event.description);
        testUtil.checkFieldContent(eventCard, 'location', event.location.toUpperCase());
        testUtil.checkFieldContent(eventCard, 'date', event.getDateToString());
    });

    describe('logged User', () => {

        it('should be able to participate or not', () => {
            let onParticipationChange = testUtil.createCheckCallFunction();
            const eventCard = testUtil.createEventCard({
                onParticipationChange
            });
            testUtil.press(eventCard, '.participate');
            testUtil.checkCall(onParticipationChange);
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