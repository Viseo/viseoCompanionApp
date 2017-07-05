import {renderCompleteComponent} from '../../global/__tests__/utilities';
import {mockNavigator} from '../../global/__tests__/mockLibrary';
import React from 'react';

import NewsFeed from '../NewsFeed';

describe('NewsFeed', () => {
    it('should render the newsFeed', () => {
        renderCompleteComponent(
            <NewsFeed navigator={mockNavigator}/>,
        );
    });
});