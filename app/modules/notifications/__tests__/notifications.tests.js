import {renderFullComponent} from '../../global/__tests__/utilities';
import {mockEvents, mockFunction, mockNavigator, mockUser} from '../../global/__tests__/mockLibrary';
import React from 'react';

import {Notification} from '../Notifications';

describe('Notification', () => {
    it('should render notification cards', () => {
        renderFullComponent(
            <Notification
                events={mockEvents}
                user={mockUser}
                navigator={mockNavigator}
                refreshing={false}
                refreshPastEvents={mockFunction}
                refreshReviewedEvents={mockFunction}
            />,
        );
    });
    it('should render emptyNotification card', () => {
        renderFullComponent(
            <Notification
                events={[]}
                user={mockUser}
                navigator={mockNavigator}
                refreshing={false}
                refreshPastEvents={mockFunction}
                refreshReviewedEvents={mockFunction}
            />,
        );
    });
});