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

    it('should display an event card', () => {
        let event = new Event(0, 'the beautiful event', 'the description of my awesome event', '1/1/2017', 'it happens here');
        const eventCard = testUtil.createEventCard({
            title: event.name,
            description: event.description,
            location: event.location,
            date: event.getTime(),
            onParticipationChange: () => {}
        });
        testUtil.checkFieldContent(eventCard, 'name', event.name);
        testUtil.checkFieldContent(eventCard, 'description', event.description);
        testUtil.checkFieldContent(eventCard, 'location', event.location.toUpperCase());
        testUtil.checkFieldContent(eventCard, 'date', event.getTime());
    });

    describe('logged User', () => {

        it('should be able to participate or not', () => {
            let onParticipationChange = testUtil.createCheckCallFunction();
            const eventCard = testUtil.createEventCard({
                onParticipationChange
            });
            testUtil.press(eventCard, '.participate');
            expect(onParticipationChange.wasCalled).to.equal(true);

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