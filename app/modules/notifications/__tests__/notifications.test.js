import {mockNavigator, renderCompleteComponent} from '../../global/__tests__/utilities';
import React from 'react';

import {Notification} from '../Notifications';

const user = {
    id: 1,
};

const events = [
    {
        id: 1,
        name: 'Veuillez noter cet event',
        datetime: '123456123',
        location: 'Boston',
    },
    {
        id: 2,
        name: 'Et celui-la aussi',
        datetime: '123456123',
        location: 'Boston',
    },
];

describe('Notification', () => {
    it('should render a notification', () => {
        renderCompleteComponent(
            <Notification
                events={events}
                user={user}
                navigator={mockNavigator}
                refreshing={false}
                refreshPastEvents={jest.fn()}
                refreshReviewedEvents={jest.fn()}
            />,
        );
    });
});