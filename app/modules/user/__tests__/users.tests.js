import React from 'react';
import {renderCompleteComponent} from '../../global/__tests__/utilities';
import {MyProfile} from '../MyProfile';
import {mockNavigator, mockUser} from '../../global/__tests__/mockLibrary';

describe('User', () => {
    it('Should render MyProfile', () => {
        renderCompleteComponent(
            <MyProfile navigator={mockNavigator} user={mockUser}/>,
        );
    });
});