import React from 'react';
import {mockFunction, mockNavigator} from '../../global/__tests__/mockLibrary';
import {renderFullComponent} from '../../global/__tests__/utilities';
import {SignIn} from '../authentication/SignIn';

//todo renderFullComponent( SignIn, SignUp, SignUpPopUp, RecoverPass, Signout)

describe( 'Authentication', () => {
    it( 'Should render signIn component', () => {
        renderFullComponent(
            <SignIn navigator={mockNavigator}
                    toggleRememberUser={mockFunction} rememberUser={true} authenticate={mockFunction}
                    isAuthenticated={true} isAuthenticating={true}/>,
        );
    } );
} );