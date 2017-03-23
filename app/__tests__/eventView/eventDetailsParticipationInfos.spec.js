/**
 * Created by VBO3596 on 23/03/2017.
 */
import React from "react";
import {
    Image,
} from "react-native";
import testUtil from '../testUtil';
import Event from '../../util/event';
import AppText from './../../components/appText';
import testComponents from '../testComponents';

describe('EventDetailsParticipationInfos', () => {
    let event =
        new Event(0,
            'the beautiful event',
            'the description of my awesome event',
            '2013-03-07T07:00:00+08:00',
            'it happens here');
    const detailsParticipationInfos = testUtil.createEventDetailsParticipationInfos({event: event});

    it('should display 5 texts (participants label and number, event hour and date, "going" label', () => {
        expect(testUtil.getComponentsOfTypeInContainer(detailsParticipationInfos, AppText)).to.have.length(5);
    });

    it('should "going" button be checked or unchecked when pressed', () => {
        const pressFunction = testUtil.createCheckCallFunction();
        const detailsParticipationInfos = testUtil.createEventDetailsParticipationInfos({event: event, onPressGoing: pressFunction});
        let checkedBeforePress = testUtil.getState(detailsParticipationInfos).going;
        testUtil.press(testComponents.getChildren(detailsParticipationInfos, 'TouchableOpacity'));
        let checkedAfterPress = testUtil.getState(detailsParticipationInfos).going;
        testUtil.compare(checkedAfterPress, !checkedBeforePress);
        testUtil.checkCall(pressFunction);
    });
});