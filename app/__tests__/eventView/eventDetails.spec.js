/**
 * Created by VBO3596 on 23/03/2017.
 */
import React from "react";
import testUtil from '../testUtil';
import Event from '../../util/event';

describe('EventDetails', () => {
    let event =
        new Event(0,
            'the beautiful event',
            'the description of my awesome event',
            '2013-03-07T07:00:00+08:00',
            'it happens here');
    const details = testUtil.createEventDetails({event: event});

    it('should display 1 app header, one scroll view with event header, participation info and event illustration',
        () => {
        testUtil.checkChildComponentExists(details, 'Header');
        testUtil.checkChildComponentExists(details, 'ScrollView');
        testUtil.checkChildComponentExists(details, 'EventDetailsHeader');
        testUtil.checkChildComponentExists(details, 'EventDetailsParticipationInfos');
        testUtil.checkChildComponentExists(details, 'Image');
    });
});