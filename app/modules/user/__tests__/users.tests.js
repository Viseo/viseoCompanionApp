import React from 'react';
import {renderFullComponent, renderShallowComponent} from '../../global/__tests__/utilities';
import {MyProfile} from '../MyProfile';
import {mockFunction, mockNavigator, mockUser} from '../../global/__tests__/mockLibrary';
import {OtherProfile} from '../OtherProfile';
import {EditProfile} from '../EditProfile';

describe( 'User', () => {
    it( 'Should render MyProfile', () => {
        renderFullComponent(
            <MyProfile navigator={mockNavigator} user={mockUser}/>,
        );
    } );
    it( 'Should render OtherProfile', () => {
        renderFullComponent(
            <OtherProfile otherProfileId={1} otherProfile={mockUser} isFetching={false} getUser={mockFunction}/>,
        );
    } );
    it( 'Should render activityIndicator when fetching', () => {
        renderFullComponent(
            <OtherProfile otherProfileId={1} otherProfile={{}} isFetching={true} getUser={mockFunction}/>,
        );
    } );
    it( 'Should render editProfile', () => {
        renderShallowComponent(
            <EditProfile user={mockUser} navigator={mockNavigator} updateUser={mockFunction} signOut={mockFunction}/>,
        );
    } );
} );