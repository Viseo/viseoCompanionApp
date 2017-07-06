import {renderFullComponent} from '../../global/__tests__/utilities';
import {mockNavigator} from '../../global/__tests__/mockLibrary';
import React from 'react';

import NewsFeed from '../NewsFeed';

describe('NewsFeed', () => {
    it('should render the newsFeed', () => {
        renderFullComponent(
            <NewsFeed navigator={mockNavigator}/>,
        );
    });
});