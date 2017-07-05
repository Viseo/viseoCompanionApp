import React from 'react';
import {renderOneLevelComponent} from '../../global/__tests__/utilities';
import {SplashScreen} from '../SplashScreen';
import {mockFunction, mockNavigator, mockUser} from '../../global/__tests__/mockLibrary';

describe( 'appLoader', () => {
    it( 'Render SplashScreen component', () => {
        renderOneLevelComponent(
            <SplashScreen navigator={mockNavigator}
                          isAuthenticated={true}
                          loggedUser={mockUser}
                          authenticate={mockFunction}
            />,
        );
    } );
} );