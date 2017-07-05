import {mockNavigator, renderCompleteComponent} from '../../global/__tests__/utilities';
import React from 'react';

import NewsFeed from '../NewsFeed';

describe('NewsFeed', () => {
    it('should render the newsFeed', () => {
        renderCompleteComponent(
            <NewsFeed navigator={mockNavigator}/>,
        );
    });
});