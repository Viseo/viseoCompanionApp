import React from 'react';
import VizzManagement from '../VizzManagement';
import {renderFullComponent} from '../../global/__tests__/utilities';

describe( 'Vizz', () => {
    it( 'Should render a vizz component', () => {
        renderFullComponent(
            <VizzManagement/>,
        );
    } );
} );