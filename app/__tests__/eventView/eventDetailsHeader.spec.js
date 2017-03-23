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
import categories from '../../util/eventCategories';

describe('EventDetailsHeader', () => {
    let event =
        new Event(0,
            'the beautiful event',
            'the description of my awesome event',
            '2013-03-07T07:00:00+08:00',
            'it happens here');
    const detailsHeader = testUtil.createEventDetailsHeader({event: event});

    it('should display 3 images (user avatar, user icon, location icon)', () => {
        expect(testUtil.getComponentsOfTypeInContainer(detailsHeader, Image)).to.have.length(3);
    });

    it('should display 4 texts (title, category, organizator name, location)', () => {
        expect(testUtil.getComponentsOfTypeInContainer(detailsHeader, AppText)).to.have.length(4);
    });

    it('should display event title', () => {
        testUtil.checkChildComponentWithPropValue(detailsHeader, AppText, 'children', event.name);
    });

    it('should display event category', () => {
        let categoryName = categories.eventCategories[event.category];
        testUtil.checkChildComponentWithPropValue(detailsHeader, AppText, 'children', categoryName);
    });

    it('should display event location', () => {
        testUtil.checkChildComponentWithPropValue(detailsHeader, AppText, 'children', event.location);
    });
});